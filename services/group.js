var https = require('https');
var xml2js = require('xml2js');
var groups = {};
var host, port , auth, origin;

groups.getUserGroups = function(req, res) {

    var options = {
        rejectUnauthorized: false,
        hostname: host,
        port: port,
        path:  "/sap/opu/odata/UI2/PAGE_BUILDER_PERS/PageSets('%2FUI2%2FFiori2LaunchpadHome')/Pages?$expand=PageChipInstances/Chip/ChipBags/ChipProperties",
        method: 'GET',
        auth: auth,
        agent: false
    };

    var parser = new xml2js.Parser();

    https.get(options, function(response) {

        var bodyChunks = [];
        response.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            var jsonResult = [];
            console.log(body.toString());
            //convert the XML response to JSON using the xml2js
            parser.parseString(body, function (err, result) {
                var groups =  result.feed.entry;
                var currentGroupProperties, currentGroupTiles;
                if(groups){
                     for(var i=0; i<groups.length; i++){
                        currentGroupProperties = groups[i].content[0]['m:properties'][0];
                        currentGroupTiles = groups[i].link[3]['m:inline'][0].feed[0].entry;

                        var groupJson = {
                            id : currentGroupProperties['d:id'][0],
                            title : currentGroupProperties['d:id'][0]==='/UI2/Fiori2LaunchpadHome'? 'My Home' : currentGroupProperties['d:title'][0],
                            tiles: []
                        };

                        //iterate on current group tiles and add them the json
                        var tileProps, chip, curTile;
                        if(currentGroupTiles){
                             for(var k=0; k<currentGroupTiles.length; k++){

                                   chip = currentGroupTiles[k].link[1]['m:inline'][0];
                                   if(chip !== ""){ //Need to remove tiles that were built from a catalog chip which is no longer exists, they should be removed...(not appear in FLP)
                                       tileProps = chip.entry[0].content[0]['m:properties'][0]; //currentGroupTiles[k].content[0]['m:properties'][0];
                                       curTile = {
                                            title: tileProps['d:title'][0],
                                            configuration: parseConfiguration(tileProps['d:configuration'][0]),
                                            url: tileProps['d:url'][0],
                                            baseChipId: tileProps['d:baseChipId'][0],//identify the type of tile (e.g."X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER")
                                            id: tileProps['d:id'][0]
                                       };
                                       curTile.isDoubleWidth = curTile.configuration.col > 1;
                                       curTile.isDoubleHeight = curTile.configuration.row > 1;
                                       curTile.icon =  '/images/index/main/apps/NewsImage11.png';
                                       curTile.refreshInterval = curTile.configuration['service_refresh_interval'];
                                       curTile.realIcon = matchTileIcon(curTile.configuration['display_icon_url']);
                                       curTile.navigationTargetUrl = curTile.configuration['navigation_target_url'];
                                       curTile.serviceURL = curTile.configuration['service_url'];

                                       //Try to build working app url
                                       curTile.navUrl = undefined;
                                       if(curTile.navigationTargetUrl){
                                           if(curTile.navigationTargetUrl.indexOf('#')===-1){ //it doesn't contain semantic object + action
                                               curTile.navUrl = origin  + curTile.navigationTargetUrl;
                                           }else{
                                               curTile.navUrl = origin + '/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?' + curTile.navigationTargetUrl;
                                           }
                                       }
                                       curTile.dynamicData = 0;
                                       getDynamicData(curTile);

                                       curTile.description = curTile.configuration['display_subtitle_text'];
                                       curTile.displayInfoText = curTile.configuration['display_info_text'];
                                       curTile.displayNumberUnit = curTile.configuration['display_number_unit'];
                                       switch(curTile.baseChipId){
                                           case "X-SAP-UI2-CHIP:/UI2/AR_SRVC_NEWS":
                                               curTile.type = 0;
                                               break;
                                           case "X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER":
                                               curTile.type = 1;
                                               break;
                                           default: //"X-SAP-UI2-CHIP:/UI2/STATIC_APPLAUNCHER":
                                               curTile.type = 2;
                                       }
                                       groupJson.tiles.push(curTile);
                                   }
                             }
                        }
                        if(groupJson.tiles.length === 0){
                            groupJson.tiles.push(getEmptyTile());
                        }
                        jsonResult.push(groupJson);
                     }
                 }
                 //Needs to be after the parsing completes
                 res.json({ //Set the response back
                        status: 'OK',
                        results:jsonResult
                });
            })
         })

    }).on('error', function(e) {
            console.error(e);
            var jsonResult = jsonResult || [];
            //work-around for non working ABAP
            if(jsonResult.length === 0){

                for(var i=0; i<6; i++){
                    var tile, tiles = [];
                    for(var k=0 ; k<i; k++){
                       tile = {
                            title: "TileTitle_" + k,
                            description: "TileDescription_" + k,
                            configuration: JSON.parse('{"row":"1","col":"1"}'), //Default value for regular tiles
                            url: "TODO tileURL",
                            baseChipId: "TODO",
                            id: "Tile_" + k,
                            isNews: (k%2)?true:false
                        };
                        tile.isDoubleWidth = tile.configuration.row > 1,
                        tile.isDoubleHeight = tile.configuration.col > 1,
                        tiles.push(tile);
                    }
                    jsonResult.push({
                        id : "Group_" + i,
                        title : "GroupTitle_" + i,
                        tiles: tiles
                    });
                }
            }
            res.json({ //Set the response back
                status: 'OK',
                results:jsonResult
            });
       });

    var parseConfiguration = function(confString){
        var res;
        if(!confString){
            res = {"row":"1","col":"1"};
        }else{
            res = JSON.parse(confString);
            if(res.tileConfiguration){
                res = JSON.parse(res.tileConfiguration);
            }
        }
        return res;
    };

    var getEmptyTile = function(){
        return {
            title: '',
            configuration: {"row":"1","col":"1"},
            url: '',
            icon: '/images/index/main/apps/plusSign.png',
            type: -1
        };
    };

    var getDynamicData = function(curTile){

        if(curTile.serviceURL){
                    options.path = curTile.serviceURL;
                    https.get(options, function(response) {
                        var bodyChunks = [];
                        response.on('data', function(chunk) {
                            bodyChunks.push(chunk);
                        });
                        response.on('end', function() {
                            var body = Buffer.concat(bodyChunks);
                            this.dynamicData = body.toString();
                        });
                    }.bind(curTile))
                }
    };

    var matchTileIcon = function(fontName){

        switch(fontName){

            case 'sap-icon://multi-select':
                return 'glyphicon glyphicon-list';
                break;
            case 'sap-icon://action-settings':
                return 'glyphicon glyphicon-cog';
                break;
            case 'sap-icon://appointment':
                return 'glyphicon glyphicon-calendar';
                break;
            case 'sap-icon://travel-itinerary':
                return 'glyphicon glyphicon-plane';
                break;
            case 'sap-icon://table-chart':
                return 'glyphicon glyphicon-th';
                break;
            default:
                return 'glyphicon glyphicon-eye-close';
        }
    }
};

module.exports = function(opts) {
    if(opts) {
        if(opts.fiori) {
            var url = opts.fiori.split('//')[1].split(':');
            host = url[0];
            port = url[1];
            origin = opts.fiori;
        }
        if(opts.fioriAuth) {
            auth = opts.fioriAuth;
        }
    }
    return groups;
};
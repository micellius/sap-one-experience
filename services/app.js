/**
 * Created by i070970 on 9/8/14.
 */
var request = require('request'),
    app = {},
    mock = {},
    schema,
    host,
    port,
    origin,
    auth;

var GROUPS_PATH = '/sap/opu/odata/UI2/PAGE_BUILDER_PERS/PageSets(\'%2FUI2%2FFiori2LaunchpadHome\')?$format=json&$expand=Pages/PageChipInstances/Chip';
var TILE_TYPES = [                              // (-1) Default: Static tile
    'X-SAP-UI2-CHIP:/UI2/AR_SRVC_NEWS',         // (0)  News tile
    'X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER'   // (1)  Dynamic tile
];
var TILE_ICONS = {"accelerated":"","accept":"","accidental-leave":"","account":"","accounting-document-verification":"","action":"","cog":"cog","activities":"","activity-2":"","activity-assigned-to-goal":"","activity-individual":"","activity-items":"","add":"","add-activity":"","add-activity-2":"","add-contact":"","add-coursebook":"","add-equipment":"","add-favorite":"","add-filter":"","add-photo":"","add-product":"","address-book":"","addresses":"","alert":"","along-stacked-chart":"","alphabetical-order":"","appointment":"","appointment-2":"","approvals":"","area-chart":"","arobase":"","arrow-bottom":"","arrow-left":"","arrow-right":"","arrow-top":"","attachment":"","attachment-audio":"","attachment-e-pub":"","attachment-html":"","attachment-photo":"","attachment-text-file":"","attachment-video":"","attachment-zip-file":"","background":"","badge":"","bar-chart":"","bar-code":"","basket":"","batch-payments":"","bbyd-active-sales":"","bbyd-dashboard":"","bed":"","begin":"","blank-tag":"","blank-tag-2":"","bo-strategy-management":"","bookmark":"","border":"","bubble-chart":"","building":"","burglary":"","bus-public-transport":"","business-by-design":"","business-card":"","business-objects-experience":"","business-objects-explorer":"","business-objects-mobile":"","business-one":"","calendar":"","camera":"","capital-projects":"","car-rental":"","card":"","cargo-train":"","cart":"","cart-2":"","cart-3":"","cart-4":"","cart-5":"","cart-approval":"","cart-full":"","cause":"","chain-link":"","chalkboard":"","chart-axis":"","Chart-Tree-Map":"","check-availability":"","choropleth-chart":"","citizen-connect":"","clinical-order":"","clinical-tast-tracker":"","close-command-field":"","collaborate":"","collapse":"","collapse-group":"","collections-insight":"","collections-management":"","collision":"","color-fill":"","column-chart-dual-axis":"","comment":"","commission-check":"","company-view":"","compare":"","compare-2":"","competitor":"","complete":"","contacts":"","course-book":"","course-program":"","create":"","create-entry-time":"","create-leave-request":"","create-session":"","credit-card":"","crm-sales":"","crm-service-manager":"","crop":"","crossed-line-chart":"","curriculum":"","customer":"","customer-and-contacts":"","customer-and-supplier":"","customer-briefing":"","customer-financial-fact-sheet":"","customer-history":"","customer-order-entry":"","customer-view":"","database":"","decision":"","decline":"","delete":"","detail-view":"","dimension":"","discussion":"","discussion-2":"","dishwasher":"","display":"","display-more":"","doc-attachment":"","doctor":"","document":"","document-text":"","documents":"","down":"","download":"","draw-rectangle":"","drill-down":"","drill-up":"","drop-down-list":"","dropdown":"","duplicate":"","e-care":"","e-learning":"","eam-work-order":"","edit":"","education":"","electrocardiogram":"","electronic-medical-record":"","email":"","email-read":"","employee":"","employee-approvals":"","employee-lookup":"","employee-pane":"","employee-rejections":"","end-user-experience-monitoring":"","endoscopy":"","energy-saving-lightbulb":"","enter-more":"","eraser":"","error":"","example":"","excel-attachment":"","exit-full-screen":"","expand":"","expand-group":"","expense-report":"","explorer":"","factory":"","fallback":"","family-care":"","family-protection":"","favorite":"","favorite-list":"","fax-machine":"","feed":"","feeder-arrow":"","filter":"","flag":"","flight":"","fob-watch":"","folder":"","folder-blank":"","folder-full":"","form":"","forward":"","fridge":"","full-screen":"","full-stacked-chart":"","full-stacked-column-chart":"","functional-location":"","future":"","gantt-bars":"","general-leave-request":"","generate-shortcut":"","geographic-bubble-chart":"","globe":"","goal":"","goalseek":"","grid":"","group":"","group-2":"","header":"","heating-cooling":"","hide":"","hint":"","history":"","home":"","home-share":"","horizontal-bar-chart":"","horizontal-bar-chart-2":"","horizontal-grip":"","horizontal-stacked-chart":"","hr-approval":"","idea-wall":"","image-viewer":"","inbox":"","incident":"","incoming-call":"","initiative":"","inspect":"","inspect-down":"","inspection":"","instance":"","insurance-car":"","insurance-house":"","insurance-life":"","internet-browser":"","inventory":"","ipad":"","ipad-2":"","iphone":"","iphone-2":"","it-host":"","it-instance":"","it-system":"","journey-arrive":"","journey-change":"","journey-depart":"","kpi-corporate-performance":"","kpi-managing-my-area":"","lab":"","laptop":"","lateness":"","lead":"","lead-outdated":"","leads":"","learning-assistant":"","less":"","letter":"","lightbulb":"","line-chart":"","line-chart-dual-axis":"","line-charts":"","list":"","loan":"","locate-me":"","locked":"","log":"","machine":"","manager":"","manager-insight":"","map":"","map-2":"","map-3":"","marketing-campaign":"","meal":"","measure":"","measurement-document":"","measuring-point":"","media-forward":"","media-pause":"","media-play":"","media-reverse":"","media-rewind":"","meeting-room":"","menu":"","menu2":"","microphone":"","mileage":"","money-bills":"","monitor-payments":"","move":"","mri-scan":"","multi-select":"","multiple-bar-chart":"","multiple-line-chart":"","multiple-pie-chart":"","multiple-radar-chart":"","my-sales-order":"","my-view":"","nav-back":"","navigation-down-arrow":"","navigation-left-arrow":"","navigation-right-arrow":"","navigation-up-arrow":"","negative":"","Netweaver-business-client":"","newspaper":"","notes":"","notification":"","notification-2":"","number-sign":"","nurse":"","nutrition-activity":"","official-service":"","offsite-work":"","open-command-field":"","open-folder":"","opportunities":"","opportunity":"","order-status":"","org-chart":"","outgoing-call":"","overflow":"","overlay":"","overview-chart":"","paging":"","paid-leave":"","palette":"","paper-plane":"","passenger-train":"","past":"","pause":"","payment-approval":"","pdf-attachment":"","pdf-reader":"","pending":"","per-diem":"","performance":"","permission":"","person-placeholder":"","personnel-view":"","pharmacy":"","phone":"","photo-voltaic":"","physical-activity":"","picture":"","pie-chart":"","pipeline-analysis":"","play":"","pool":"","popup-window":"","positive":"","post":"","ppt-attachment":"","present":"","print":"","private":"","process":"","product":"","projector":"","provision":"","pull-down":"","pushpin-off":"","pushpin-on":"","puzzle":"","quality-issue":"","question-mark":"","radar-chart":"asterisk","receipt":"","record":"","redo":"","refresh":"","repost":"","request":"","resize":"","response":"","retail-store":"","retail-store-manager":"","role":"","sales-document":"","sales-notification":"","sales-order":"","sales-order-item":"","sales-quote":"","sap-box":"","sap-logo-shape":"","save":"","scatter-chart":"","search":"","settings":"","share":"","share-2":"","shelf":"","shield":"","shipping-status":"","shortcut":"","show":"","signature":"","simple-payment":"","simulate":"","slim-arrow-down":"","slim-arrow-left":"","slim-arrow-right":"","slim-arrow-up":"","soccor":"","sonography":"","sort":"","sort-ascending":"","sort-descending":"","sorting-ranking":"","status-completed":"","status-error":"","status-in-process":"","status-inactive":"","step":"","stethoscope":"","study-leave":"","subway-train":"","suitcase":"","supplier":"","survey":"","switch-classes":"","switch-views":"","synchronize":"","syntax":"","syringe":"","sys-add":"","sys-back":"","sys-back-2":"","sys-cancel":"","sys-cancel-2":"","sys-enter":"","sys-enter-2":"","sys-find":"","sys-find-next":"","sys-first-page":"","sys-help":"","sys-help-2":"","sys-last-page":"","sys-minus":"","sys-monitor":"","sys-next-page":"","sys-prev-page":"","system-exit":"","system-exit-2":"","table-chart":"th","table-view":"","tag":"","tag-cloud-chart":"","tags":"","target-group":"","task":"","taxi":"","technical-object":"","temperature":"","theater":"","thing-type":"","time-account":"","time-entry-request":"","time-overtime":"","timesheet":"","to-be-reviewed":"","toaster-down":"","toaster-top":"","toaster-up":"","tools-opportunity":"","travel-expense":"","travel-expense-report":"","travel-itinerary":"","travel-request":"","tree":"","trip-report":"","umbrella":"","undo":"","unfavorite":"","unlocked":"","unpaid-leave":"","unwired":"","up":"","upload":"","upstacked-chart":"","value-help":"","vds-file":"","vehicle-repair":"","vertical-bar-chart":"","vertical-bar-chart-2":"","vertical-grip":"","vertical-stacked-chart":"","video":"","visits":"","waiver":"","wallet":"","warning":"","warning2":"","washing-machine":"","weather-proofing":"","web-cam":"","widgets":"","windows-doors":"","work-history":"","workflow-tasks":"","world":"","wounds-doc":"","wrench":"","x-ray":"","zoom-in":"","zoom-out":"",
    "fiori2/f0002":"repeat","fiori2/f0018":"usd","fiori2/f0019":"usd","fiori2/f0024":"book","fiori2/f0039":"log-out","fiori2/f0388":"repeat","businesssuiteinappsymbols/icon-program":""
};

app.getGroups = function(req, res) {
    request.get({
        url: origin + GROUPS_PATH,
        rejectUnauthorized: false,
        headers: {
            'Authorization': auth,
            'Accept': 'application/json'
        }
    }, function (error, response, body) {
        var results;
        if(error) {
            res.json({
                status: 'ERROR',
                results: {
                    code: error.code,
                    message: error.message
                }
            });
        } else {
            try {
                body = JSON.parse(body);
                results = body.d.Pages.results.map(function(group) {
                    return {
                        id: group.id,
                        title: (group.id === '/UI2/Fiori2LaunchpadHome') ? 'My Home' : group.title,
                        tiles: group.PageChipInstances.results.map(function(pageChipInstance) {
                            var chip = pageChipInstance.Chip,
                                cfg;
                            if(chip) {
                                cfg = chip.configuration ? JSON.parse(JSON.parse(chip.configuration).tileConfiguration || '{}') : {};
                                return {
                                    id: chip.id,
                                    type: TILE_TYPES.indexOf(chip.baseChipId),
                                    title: chip.title,
                                    subtitle: cfg.display_subtitle_text,
                                    info: cfg.display_info_text,
                                    number: cfg.display_number_unit,
                                    icon: TILE_ICONS[(cfg.display_icon_url || '').split('//').pop().toLowerCase()]
                                };
                            } else {
                                return {};
                            }
                        })
                    };
                });
                res.json({
                    status: 'OK',
                    results: results
                });
            } catch (error) {
                res.json({
                    status: 'ERROR',
                    results: {
                        code: error.code,
                        message: error.message
                    }
                });
            }
        }
    });
};

mock.getGroups = function(req, res) {
    var data = {
        status: 'OK',
        results: [{
            id: '/UI2/Fiori2LaunchpadHome',
            title: 'My Home',
            tiles: [{
                id: 'g1t1',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t2',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t3',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t4',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t5',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t6',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t7',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t8',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t9',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t10',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t11',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g1t2',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }]
        }, {
            id: 'groupId1',
            title: 'First Group',
            tiles: [{
                id: 'g2t1',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g2t2',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g2t3',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g2t4',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }]
        }, {
            id: 'groupId2',
            title: 'Second Group',
            tiles: [{
                id: 'g3t1',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g3t2',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g3t3',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g3t4',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g3t5',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }, {
                id: 'g3t6',
                type: -1,
                title: 'Static Tile',
                subtitle: 'Subtitle',
                info: 'Info',
                number: '000',
                icon: 'cog'
            }]
        }]
    };

    if(arguments.length) {
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

module.exports = function(opts) {
    var urlParts;
    if(opts) {
        if(opts.fiori) {
            origin = opts.fiori;
            urlParts = opts.fiori.split('//');
            schema = urlParts[0];
            urlParts = urlParts[1].split(':');
            host = urlParts[0];
            port = urlParts[1];
        }
        if(opts.fioriAuth) {
            auth = 'Basic ' + new Buffer(opts.fioriAuth).toString('base64');
        }
        if(opts.mock) {
            return mock;
        }
    }
    return app;
};
const xm = {
  audits: require('./audits'),
  common: require('./common'),
  dictionary: require('./dictionary'),
  devices: require('./devices'),
  deviceNames: require('./deviceNames'),
  deviceTypes: require('./deviceTypes'),
  dynamicTeams: require('./dynamicTeams'),
  environments: require('./environments'),
  events: require('./events'),
  forms: require('./forms'),
  groups: require('./groups'),
  groupMembers: require('./groupMembers'),
  integrations: require('./integrations'),
  importJobs: require('./importJobs'),
  onCall: require('./onCall'),
  people: require('./people'),
  plans: require('./plans'),
  planConstants: require('./planConstants'),
  planEndpoints: require('./planEndpoints'),
  planProperties: require('./planProperties'),
  roles: require('./roles'),
  scenarios: require('./scenarios'),
  sharedLibraries: require('./sharedLibraries'),
  shifts: require('./shifts'),
  sites: require('./sites'),
  subscriptionForms: require('./subscriptionForms'),
  subscriptions: require('./subscriptions'),
  temporaryAbsences: require('./temporaryAbsences'),
};

/**
 * A module related synchronizing xMatters data<br><br>
 *
 * @module sync
 */

/**
 * @typedef {Object} ExtractOptions
 * @property {boolean} [audits=false] Whether or not to get audits from xMatters.
 * @property {boolean} [deviceNames=false] Whether or not to get deviceNames from xMatters.
 * @property {boolean} [devices=false] Whether or not to get devices from xMatters.
 * @property {boolean} [deviceTypes=false] Whether or not to get deviceTypes from xMatters.
 * @property {boolean} [dynamicTeams=false] Whether or not to get dynamicTeams from xMatters.
 * @property {boolean} [events=false] Whether or not to get events from xMatters.
 * @property {boolean} [forms=false] Whether or not to get forms from xMatters.
 * @property {boolean} [groupMembers=false] Whether or not to get groupMembers from xMatters.
 * @property {boolean} [groups=false] Whether or not to get groups from xMatters.
 * @property {boolean} [integrations=false] Whether or not to get integrations from xMatters.
 * @property {boolean} [people=false] Whether or not to get people from xMatters.
 * @property {boolean} [planConstants=false] Whether or not to get planConstants from xMatters.
 * @property {boolean} [planEndpoints=false] Whether or not to get planEndpoints from xMatters.
 * @property {boolean} [planProperties=false] Whether or not to get planProperties from xMatters.
 * @property {boolean} [plans=false] Whether or not to get plans from xMatters.
 * @property {boolean} [roles=false] Whether or not to get roles from xMatters.
 * @property {boolean} [scenarios=false] Whether or not to get scenarios from xMatters.
 * @property {boolean} [sharedLibraries=false] Whether or not to get sharedLibraries from xMatters.
 * @property {boolean} [shifts=false] Whether or not to get shifts from xMatters.
 * @property {boolean} [sites=false] Whether or not to get sites from xMatters.
 * @property {boolean} [subscriptionForms=false] Whether or not to get subscriptionForms from xMatters.
 * @property {boolean} [subscriptions=false] Whether or not to get subscriptions from xMatters.
 * @property {boolean} [temporaryAbsences=false] Whether or not to get temporaryAbsences from xMatters.
 */

/**
 * Returns the default extract options.
 * @returns {ExtractOptions}
 */
function DefaultExtractOptions() {
  return {
    audits: false,
    deviceNames: false,
    devices: false,
    deviceTypes: false,
    dynamicTeams: false,
    events: false,
    forms: false,
    groupMembers: false,
    groups: false,
    integrations: false,
    people: false,
    planConstants: false,
    planEndpoints: false,
    planProperties: false,
    plans: false,
    roles: false,
    scenarios: false,
    sharedLibraries: false,
    shifts: false,
    sites: false,
    subscriptionForms: false,
    subscriptions: false,
    temporaryAbsences: false,
  };
}

/**
 * @typedef SyncOptions
 * @type {Object}
 *
 * @property {boolean} [forms=false, not yet supported] Whether or not to synchronize forms
 * @property {function} [formsFilter=undefined] Array.filter(callback) function to apply to the forms arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the form objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [formsQuery={ embed: 'recipients' }, //possible to include ',scenarios' but simpler to extract scenarios separately] Object representation of the query parameters supported by the Get many API request for forms
 * @property {Object} [auditsQuery={}] Object representation of the query parameters supported by the Get many API request for audits
 * @property {string} [defaultSupervisorId=undefined] The default id of person in the destination that can be used to replace any unavailable supervisors when updating or creating groups.
 * @property {boolean} [delayRemoval=true] Whether or not to delay the removal of the dependent objects when mirror mode is enabled. If set to false the objects will be removed immediately.
 * @property {Object} [deviceNamesQuery={}] Object representation of the query parameters supported by the Get many API request for deviceNames
 * @property {boolean} [devices=false] Whether or not to synchronize devices
 * @property {function} [devicesFilter=undefined] Array.filter(callback) function to apply to the devices arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the device objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [devicesQuery={ embed: 'timeframes' }] Object representation of the query parameters supported by the Get many API request for importJobs
 * @property {boolean} [dynamicTeams=false] Whether or not to synchronize dynamicTeams
 * @property {function} [dynamicTeamsFilter=undefined] Array.filter(callback) function to apply to the dynamicTeams arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the dynamicTeam objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [dynamicTeamsQuery={ embed: 'supervisors,observers' }] Object representation of the query parameters supported by the Get many API request for dynamicTeams
 * @property {Object} [eventsQuery={ embed: 'annotations,properties,responseOptions,suppressions,targetedRecipients' }] Object representation of the query parameters supported by the Get many API request for events
 * @property {boolean} [groupMembers=false] Whether or not to synchronize groupMembers
 * @property {function} [groupMembersFilter=undefined] Array.filter(callback) function to apply to the groupMembers arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the groupMember objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [groupMembersQuery={ embed: 'shifts' }] Object representation of the query parameters supported by the Get many API request for groupMembers
 * @property {boolean} [groups=false] Whether or not to synchronize groups
 * @property {function} [groupsFilter=undefined] Array.filter(callback) function to apply to the groups arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the group objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [groupsQuery={ embed: 'observers,supervisors' }] Object representation of the query parameters supported by the Get many API request for groups
 * @property {Object} [importJobsQuery={}] Object representation of the query parameters supported by the Get many API request for importJobs
 * @property {boolean} [integrations=false] Whether or not to synchronize integrations
 * @property {function} [integrationsFilter=undefined] Array.filter(callback) function to apply to the integrations arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the integration objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [integrationsQuery={ embed: 'logs' }] Object representation of the query parameters supported by the Get many API request for integrations
 * @property {boolean} [mirror=false] Whether or not to perform the sync in mirror mode. Mirror mode will remove all data from the destination that is not included in the source data after filters and queries are applied. This setting will be adopted by individual object sync options in all cases where configurable mirror mode applies. If a mixed mirror mode is desired, set the individual sync options for each object where the mirror value is different than this one.
 * @property {Object} [onCallQuery={ embed: 'members.owner,shift', membersPerShift: 100 }] Object representation of the query parameters supported by the Get many API request for onCall
 * @property {boolean} [people=false] Whether or not to synchronize people
 * @property {function} [peopleFilter=undefined] Array.filter(callback) function to apply to the people arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the peopl objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [peopleQuery={ embed: 'roles' }, //',supervisors' and ',devices' possible. simpler to extract devices separately] Object representation of the query parameters supported by the Get many API request for people
 * @property {boolean} [planConstants=false] Whether or not to synchronize planConstants
 * @property {function} [planConstantsFilter=undefined] Array.filter(callback) function to apply to the planConstants arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the planConstant objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {boolean} [planEndpoints=false] Whether or not to synchronize planEndpoints
 * @property {function} [planEndpointsFilter=undefined] Array.filter(callback) function to apply to the planEndpoints arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the planEndpoint objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {boolean} [planProperties=false] Whether or not to synchronize planProperties
 * @property {function} [planPropertiesFilter=undefined] Array.filter(callback) function to apply to the planProperties arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the planPropertie objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {boolean} [plans=false] Whether or not to synchronize plans
 * @property {function} [plansFilter=undefined] Array.filter(callback) function to apply to the plans arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the plan objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [plansQuery={ embed: 'creator,constants,endpoints,forms,propertyDefinitions,integrations' }] Object representation of the query parameters supported by the Get many API request for plans
 * @property {function} [rolesFilter=undefined] Array.filter(callback) function to apply to the roles arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the role objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [rolesQuery=undefined] Object representation of the query parameters supported by the Get many API request for roles
 * @property {boolean} [scenarios=false] Whether or not to synchronize scenarios
 * @property {function} [scenariosFilter=undefined] Array.filter(callback) function to apply to the scenarios arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the scenario objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [scenariosQuery={ embed: 'properties.translations' }] Object representation of the query parameters supported by the Get many API request for scenarios
 * @property {boolean} [sharedLibraries=false] Whether or not to synchronize sharedLibraries
 * @property {function} [sharedLibrariesFilter=undefined] Array.filter(callback) function to apply to the sharedLibraries arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the sharedLibrarie objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [sharedLibrariesQuery={}] Object representation of the query parameters supported by the Get many API request for sharedLibraries
 * @property {boolean} [shifts=false] Whether or not to synchronize shifts
 * @property {function} [shiftsFilter=undefined] Array.filter(callback) function to apply to the shifts arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the shift objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [shiftsQuery={ embed: 'members,rotation' }] Object representation of the query parameters supported by the Get many API request for shifts
 * @property {boolean} [sites=false] Whether or not to synchronize sites
 * @property {function} [sitesFilter=undefined] Array.filter(callback) function to apply to the sites arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the site objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [sitesQuery={}] Object representation of the query parameters supported by the Get many API request for sites
 * @property {boolean} [subscriptionforms=false] Whether or not to synchronize subscription forms
 * @property {function} [subscriptionFormsFilter=undefined] Array.filter(callback) function to apply to the subscription forms arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the subscription form objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [subscriptionFormsQuery={ embed: 'deviceNames,propertyDefinitions,roles' }] Object representation of the query parameters supported by the Get many API request for subscriptionForms
 * @property {boolean} [subscriptions=false] Whether or not to synchronize subscriptions
 * @property {function} [subscriptionsFilter=undefined] Array.filter(callback) function to apply to the subscriptions arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the subscription objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [subscriptionsQuery={}] Object representation of the query parameters supported by the Get many API request for subscriptions
 * @property {boolean} [temporaryAbsences=false] Whether or not to synchronize temporaryAbsences
 * @property {function} [temporaryAbsencesFilter=undefined] Array.filter(callback) function to apply to the temporaryAbsences arrays from the source and destination after data is extracted.<br><br> Example: o => o.foo === 'bar'' //filters out all but the temporaryAbsence objects where the foo property is equal to 'bar'. <br><br> Refer to the javascript Array.filter() documentation for more information.
 * @property {Object} [temporaryAbsencesQuery={}] Object representation of the query parameters supported by the Get many API request for temporaryAbsences
 * @property {boolean} [timeframes=false] Whether or not to synchronize timeframes
 * @property {function} [sitesTransform=undefined] Transforms each of the sites objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [peopleTransform=undefined] Transforms each of the people objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [devicesTransform=undefined] Transforms each of the devices objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [groupsTransform=undefined] Transforms each of the groups objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [shiftsTransform=undefined] Transforms each of the shifts objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [groupMembersTransform=undefined] Transforms each of the groupMembers objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [dynamicTeamsTransform=undefined] Transforms each of the dynamicTeams objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [temporaryAbsencesTransform=undefined] Transforms each of the temporaryAbsences objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [plansTransform=undefined] Transforms each of the plans objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [planConstantsTransform=undefined] Transforms each of the planConstants objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [planEndpointsTransform=undefined] Transforms each of the planEndpoints objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [planPropertiesTransform=undefined] Transforms each of the planProperties objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [sharedLibrariesTransform=undefined] Transforms each of the sharedLibraries objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [integrationsTransform=undefined] Transforms each of the integrations objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [scenariosTransform=undefined] Transforms each of the scenarios objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [subscriptionsTransform=undefined] Transforms each of the subscriptions objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {function} [subscriptionFormsTransform=undefined] Transforms each of the subscription forms objects. Return the object after transform. Transformation is performed on the raw source object before filtered, converted for export, or synchronized. You have full access to the source data and destination data to perform operations such as mapping.<br><br> Example: (o, sourceData, destinationData) => {o.foo = 'bar'; return o;}
 * @property {module:common.SyncOptions} [sitesOptions= { fields, mirror, delayRemoval })] Individual sync options for sites. By default fields property is set to sites.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [peopleOptions= { fields, mirror, delayRemoval, fields: peopleFields, siteCreate })] Individual sync options for people. By default fields property is set to people.fields(), mirror uses the global options value. siteCreate will automatically create sites from the person's site values. The option only works when not synchronizing sites at the same time.
 * @property {module:common.SyncOptions} [devicesOptions= { fields, mirror, delayRemoval: false })] Individual sync options for devices. By default fields property is set to devices.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [groupMembersOptions= { fields, mirror, delayRemoval: false })] Individual sync options for groupMembers. By default fields property is set to groupMembers.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [groupsOptions= {fields, mirror, delayRemoval, defaultSupervisorId, deleteShiftsOnCreate: true})] Individual sync options for groups. By default fields property is set to groups.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [shiftsOptions= { fields, mirror, delayRemoval: false })] Individual sync options for shifts. By default fields property is set to shifts.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [dynamicTeamsOptions= { fields, mirror, delayRemoval,defaultSupervisorId})] Individual sync options for dynamicTeams. By default fields property is set to dynamicTeams.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [temporaryAbsencesOptions= { fields, mirror, delayRemoval: false })] Individual sync options for temporaryAbsences. By default fields property is set to temporaryAbsences.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [integrationsOptions= { fields, mirror, delayRemoval: false })] Individual sync options for integrations. By default fields property is set to integrations.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [plansOptions= { fields, mirror, delayRemoval: false })] Individual sync options for plans. By default fields property is set to plans.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [planConstantsOptions= { fields, mirror, delayRemoval: false })] Individual sync options for planConstants. By default fields property is set to planConstants.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [planEndpointsOptions= { fields, mirror, delayRemoval: false })] Individual sync options for planEndpoints. By default fields property is set to planEndpoints.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [planPropertiesOptions= { fields, mirror, delayRemoval: false })] Individual sync options for planProperties. By default fields property is set to planProperties.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [sharedLibrariesOptions= { fields, mirror, delayRemoval: false })] Individual sync options for sharedLibraries. By default fields property is set to sharedLibraries.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [scenariosOptions= { fields, mirror, delayRemoval: false })] Individual sync options for scenarios. By default fields property is set to scenarios.fields(), mirror uses the global options value.
 * @property {module:common.SyncOptions} [subscriptionsOptions= { fields, mirror, delayRemoval: false })] Individual sync options for subscriptions. By default fields property is set to subscriptions.fields(), mirror uses the global options value.
 * @property {*} [device=undefined] Supplying an identifier such as a device TargetName (format: "person_targetName|device_name") or a device object changes the method used to extract a device by limiting to a specific device. This may be used to synchronize a single device or limit the sites extracted device for a person. An alternate API method is used (devices.get) and appropiate devicesQuery is applied to that api which may not support the same functionality as the standard endpoints(devices.getMany) used for extracting records from xMatters in the sync.
 * @property {*} [group=undefined] Supplying an identifier such as a targetName or a group object changes the method used to extract a group, group members, and shifts by limiting to a specific group. This may be used to synchronize a single group, shift, or group members. Also apllies to extracting onCall in the ExtractData function. Alternate API methods is used (groups.get) and groupsQuery is applied to that api which may not support the same functionality as the standard endpoints(groups.getMany) used for extracting records from xMatters in the sync.
 * @property {*} [person=undefined] Supplying an identifier such as a targetName or a person object changes the method used to extract a person and devices by limiting to a specific person. This may be used to synchronize a single person, their devices. Alternate API methods are used (people.get and people.getDevices) and appropiate syncOption queries are applied to those apis which may not support the same functionality as the standard endpoints(people.getMany and devices.getMany) used for extracting records from xMatters in the sync.
 * @property {*} [plan=undefined] Supplying an identifier such as a plan name or a plan object changes the method used to extract a plan, forms, scenarios, integrations, plan constants, plan endpoints, plan properties, and shared libraries by limiting to a specific plan. This may be used to synchronize a single plan or aforementioned plan sub component(s). An alternate API method is used (plans.get) and plansQuery is applied to that api which may not support the same functionality as the standard endpoints(plans.getMany) used for extracting records from xMatters in the sync.
 * @property {*} [site=undefined] Supplying an identifier such as a name or a site object changes the method used to extract a site by limiting to a specific site. This may be used to synchronize a single site or limit the sites extracted for a person or group sync. An alternate API method is used (sites.get) and appropiate sitesQuery is applied to that api which may not support the same functionality as the standard endpoints(sites.getMany) used for extracting records from xMatters in the sync.
 * @property {function} [dataExtracted] A function that is called after data is acquired from source and destination but before any manipulation. You have full access to the destination data, destination environment, source data, and source environment(undefined when using DataToxMatters) to perform operations such as backup.<br><br> Example: (destinationData, destinationEnv, sourceData, sourceEnv) => { fs.writeFileSync(`./data/${destinationEnv.subdomain}.backup.json`, JSON.stringify(destinationData))}
 * @property {boolean} [continueOnError=false] Whether or not to continue sync when an error is encountered writing data into xMatters. Changing this option to true could result in greater number of errors since it continue to sync and downstream objects that referenced objects that failed to sync will also fail. Also, setting this to true will not result in a failure sync status when api errors are encountered.
 *
 */
//dynamic teams are not supported using the targetName param until dynamic teams can be looked up by name (not just searched).

/**
 * Get default sync options object.
 * @returns {SyncOptions} Default sync options object.
 */
function DefaultSyncOptions() {
  return {
    mirror: false,
    delayRemoval: true,
    defaultSupervisorId: undefined,

    auditsQuery: {},

    devices: false,
    devicesQuery: { embed: 'timeframes' },
    devicesFilter: undefined,
    timeframes: false,

    deviceNamesQuery: {},

    dynamicTeams: false,
    dynamicTeamsQuery: { embed: 'supervisors,observers' },
    dynamicTeamsFilter: undefined,

    eventsQuery: { embed: 'annotations,properties,responseOptions,suppressions,targetedRecipients' },

    //forms: false, not yet supported.
    //formsQuery: { embed: 'recipients' }, //possible to include ',scenarios' but simpler to extract scenarios separately.
    //formsFilter: undefined,

    groups: false,
    groupsQuery: { embed: 'observers,supervisors' },
    groupsFilter: undefined,

    groupMembers: false,
    groupMembersFilter: undefined,
    groupMembersQuery: { embed: 'shifts' },

    importJobsQuery: {},

    integrations: false,
    integrationsQuery: { embed: 'logs' },
    integrationsFilter: undefined,

    onCallQuery: { embed: 'members.owner,shift', membersPerShift: 100 },

    people: false,
    peopleQuery: { embed: 'roles' }, //possible to include ',devices' but simpler to extract devices separately.
    peopleFilter: undefined,

    plans: false,
    plansQuery: { embed: 'creator,constants,endpoints,forms,propertyDefinitions,integrations' },
    plansFilter: undefined,

    planConstants: false,
    planConstantsFilter: undefined,

    planEndpoints: false,
    planEndpointsFilter: undefined,

    planProperties: false,
    planPropertiesFilter: undefined,

    rolesQuery: undefined,

    scenarios: false,
    scenariosQuery: { embed: 'properties.translations' },
    scenariosFilter: undefined,

    shifts: false,
    shiftsQuery: { embed: 'members,rotation' },
    shiftsFilter: undefined,

    sharedLibraries: false,
    sharedLibrariesQuery: {},
    sharedLibrariesFilter: undefined,

    sites: false,
    sitesQuery: {},
    sitesFilter: undefined,

    subscriptions: false,
    subscriptionsQuery: {},
    subscriptionsFilter: undefined,

    subscriptionForms: false,
    subscriptionFormsQuery: { embed: 'deviceNames,propertyDefinitions,roles' },
    subscriptionFormsFilter: undefined,

    temporaryAbsences: false,
    temporaryAbsencesQuery: {},
    temporaryAbsencesFilter: undefined,

    continueOnError: false,
  };
}

/**
 * Helper function to convert the user upload file in JSON format to data object needed to perform a sync with xMatters.
 * @param {*} json the User Upload file converted to a JSON array.
 * @param {*} env
 * @returns {Object}
 */
async function UserUploadToImport(json, env) {
  const results = {
    people: [],
    devices: [],
    remove: [],
  };

  const deviceNames = await xm.deviceNames.getMany(env);

  const ignoreColumns = [
    'Operation',
    'Password Status',
    'Last Login',
    'Externally Owned Status',
    'First Name',
    'Language',
    'Last Login',
    'Last Name',
    'Role',
    'Site',
    'Time Zone',
    'User',
    'User Supervisor',
    'UUID',
  ];

  for (let i = 0; i < deviceNames.length; i++) {
    const { name } = deviceNames[i];
    ignoreColumns.push(name + ' Status', name + ' Valid');
  }

  json.map(row => {
    if (!row.Operation || row.Operation === 'process') {
      const person = {};

      person.recipientType = 'PERSON';
      person.targetName = row.User;
      person.status = 'ACTIVE';
      if (row['First Name']) person.firstName = row['First Name'];
      if (row['Last Name']) person.lastName = row['Last Name'];
      if (row.Language) person.language = xm.dictionary.language.codeByName[row.Language];
      if (row['Time Zone']) person.timezone = row['Time Zone'];
      if (row.User) person.webLogin = row.User;
      if (row.Role) person.roles = row.Role.split('|');
      if (row.Site) person.site = row['Site'];
      if (row['User Supervisor']) person.supervisors = row['User Supervisor'].split('|');

      //get custom fields, attributes, or device.
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key) && ignoreColumns.indexOf(key) < 0) {
          const value = row[key];
          const deviceName = deviceNames.find(({ name }) => name === key);
          if (deviceName.deviceType) {
            //is device

            const device = {
              deviceType: deviceName.deviceType,
              name: key,
              owner: row.User,
              targetName: `${row.User}|${key}`,
            };

            switch (device.deviceType) {
              case 'EMAIL':
                device.emailAddress = value;
                break;
              case 'TEXT_PHONE':
              case 'VOICE':
                device.phoneNumber = value;
                break;
              default:
                break;
            }

            results.devices.push(device);
          } else {
            if (!person.properties) person.properties = {};
            //is custom field or attribute
            person.properties[key] = value.split('|');
          }
        }
      }

      results.people.push(person);
    } else if (row.Operation === 'remove') {
      results.remove.push(row['User ID']);
    }
  });

  return results;
}

/**
 * Synchronizes two xMatters instances according to the sync options.
 * @param {module:environments.xMattersEnvironment} sourceEnv The xmtoolbox representation of the source xMatters instance.
 * @param {module:environments.xMattersEnvironment} destinationEnv The xmtoolbox representation of the destination xMatters instance.
 * @param {SyncOptions} syncOptions The sync options that control the synchronization.
 * @returns {Object} destinationData An object representing the destination including data and sync results.
 */
async function xMattersToxMatters(sourceEnv, destinationEnv, syncOptions = {}) {
  const { mirror, dataExtracted } = xm.common.defaultsDeep(syncOptions, DefaultSyncOptions());
  let sameEnvironment = sourceEnv === destinationEnv;
  if (sameEnvironment)
    console.log(
      'The source and destination environments are the same. Related data will not be queried unnecessarily and subsequently mapping warnings may exists. Mapping is not necessary when same environment is used.'
    );

  //start sync
  destinationEnv.log.time('SYNC');

  //get the list(object) of needed data from each instance and extract the data
  let [sourceData, destinationData] = await Promise.all([
    !sameEnvironment && ExtractData(sourceEnv, GetExtractOptions(syncOptions), syncOptions),
    ExtractData(destinationEnv, GetExtractOptions(syncOptions, !sameEnvironment), syncOptions),
  ]);

  if (sameEnvironment) {
    sourceData = JSON.parse(JSON.stringify(destinationData));
    sourceEnv = xm.environments.copy(destinationEnv);
  }

  if (dataExtracted) {
    dataExtracted(destinationData, destinationEnv, sourceData, sourceEnv);
  }

  //convert objects to import-ready objects and sync into xMatters
  await ConvertAndSyncObjects(sourceData, destinationData, destinationEnv, syncOptions);

  await NonMirrorDelete(destinationEnv, sourceData.remove, destinationData.syncResults, syncOptions);

  //FOR MIRROR MODE ONLY after data is added, remove any objects remove dependent data in safe order
  await MirrorOrderedDelete(destinationEnv, destinationData.syncResults, syncOptions);

  destinationEnv.log.timeEnd('SYNC');

  return destinationData;
}

/**
 * Synchronizes a set of data into an instance of xMatters according to the sync options.
 * @param {module:common.xMattersData} sourceData The data to synchronize into xMatters.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance.
 * @param {SyncOptions} syncOptions The sync options that control the synchronization.
 * @returns {Object} destinationData An object representing the destination including data and sync results.
 */
async function DataToxMatters(sourceData, destinationEnv, syncOptions = {}) {
  //set options and defaults.
  const { mirror } = xm.common.defaultsDeep(syncOptions, DefaultSyncOptions());
  const { dataExtracted } = syncOptions;

  //start sync
  destinationEnv.log.time('SYNC');

  //get the list(object) of needed data from each instance and extract the data
  const destinationData = await ExtractData(
    destinationEnv,
    GetExtractOptions(syncOptions, true),
    syncOptions
  );

  if (dataExtracted) {
    dataExtracted(destinationData, destinationEnv, sourceData);
  }

  //siteCreate implementation, requires sites not to be synced and site supplied in person record as site name
  if (
    syncOptions.people &&
    syncOptions.peopleOptions &&
    syncOptions.peopleOptions.siteCreate &&
    !syncOptions.sites
  ) {
    //try to get "Default Site" to get country, language. and timezone from this site/instance
    let defaultSite = destinationData.sites.find(site => site.name === 'Default Site');
    if (!defaultSite) {
      //one was not found named "Default Site" so use the first one in the instance
      defaultSite = destinationData.sites[0];
    }

    const { timezone, language, country } = defaultSite;

    sourceData.people.forEach(person => {
      //if site exists and not already captured, add it to list
      if (person.site) {
        let siteLower = (person.site.name || person.site).toLowerCase();
        if (!sourceData.sites.some(site => site.name.toLowerCase() === siteLower)) {
          sourceData.sites.push({ name: person.site, initial: { timezone, language, country } });
        }
      }
    });

    syncOptions.sitesOptions = {
      fields: ['name'],
    };
    syncOptions.sites = true;
  }

  //convert objects to import-ready objects and sync into xMatters
  await ConvertAndSyncObjects(sourceData, destinationData, destinationEnv, syncOptions);

  await NonMirrorDelete(destinationEnv, sourceData.remove, destinationData.syncResults, syncOptions);

  //FOR MIRROR MODE ONLY after data is added, remove any objects remove dependent data in safe order
  await MirrorOrderedDelete(destinationEnv, destinationData.syncResults, syncOptions);

  destinationEnv.log.timeEnd('SYNC');

  return destinationData;
}

/***
 * Returns the ExtractOptions based on SyncOptions. Useful for producing extraction options needed for a specific sync option set.
 *
 * Returns the data acquired from the environment.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance
 * @param {SyncOptions} syncOptions The sync options that control the synchronization.
 * @param {boolean} isDestination whether or not the instance is the target destination instance (where the data is being synced to)
 * @returns {module:sync.ExtractOptions}
 */
function GetExtractOptions(syncOptions, isDestination) {
  const {
    sites,
    people,
    devices,
    groups,
    shifts,
    groupMembers,
    dynamicTeams,
    dynamicTeamsQuery,
    temporaryAbsences,
    plans,
    syncForms,
    integrations,
    planConstants,
    planEndpoints,
    planProperties,
    scenarios,
    sharedLibraries,
    subscriptions,
    subscriptionForms,
  } = xm.common.defaultsDeep(syncOptions, DefaultSyncOptions());

  const get = {};

  /*
  The data required for extract should be 
  included when the sync[OBJECT] is true. If the
  object is needed for Object's ExportToImport function
  then the data should be included when Sync[Object] and
  isDestination are both true. 
  */

  if (sites) {
    get.sites = true;
  }

  if (people) {
    get.people = true;

    if (isDestination) {
      get.sites = true;
    }
  }

  if (devices) {
    get.devices = true;

    if (isDestination) {
      get.people = true;
    }
  }

  if (groups) {
    get.groups = true;

    if (isDestination) {
      get.sites = true;
      get.people = true;
    }
  }

  if (groupMembers) {
    get.groups = true;

    if (isDestination) {
      get.sites = true;
    }
  }

  if (groupMembers) {
    get.groups = true;
    get.groupMembers = true;
  }

  if (dynamicTeams) {
    get.dynamicTeams = true;
    if (
      isDestination &&
      dynamicTeamsQuery.embed &&
      dynamicTeamsQuery.embed.toLowerCase().indexOf('supervisors') > -1
    ) {
      get.people = true;
    }
  }

  if (shifts) {
    // as of 2020-jan-20, there is no ability to get shifts from a groups request
    // so each group must be requested and synced. Also there is not ability to
    // update a shift, only get, delete, and create. A combination of delete
    // and create is used to update shifts.
    get.shifts = true;
    get.groups = true;
    if (isDestination) {
      get.people = true;
      get.devices = true;
      get.dynamicTeams = true;
    }
  }

  if (syncForms) {
    get.plans = true;
    get.forms = true;
  }

  if (scenarios) {
    get.plans = true;
    get.forms = true;
    get.scenarios = true;
    if (isDestination) {
      get.people = true;
    }
  }

  if (temporaryAbsences) {
    get.temporaryAbsences = true;
    if (isDestination) {
      get.groups = true;
      get.people = true;
    }
  }

  if (plans) {
    get.plans = true;
  }

  if (integrations) {
    get.plans = true;
    get.forms = true;
    get.integrations = true;
  }

  if (planConstants) {
    get.plans = true;
    get.planConstants = true;
  }

  if (planEndpoints) {
    get.plans = true;
    get.planEndpoints = true;
  }

  if (planProperties) {
    get.plans = true;
    get.planProperties = true;
  }

  if (subscriptions) {
    get.plans = true;
    get.subscriptions = true;
    get.subscriptionForms = true;
    if (isDestination) {
      get.people = true;
    }
  }

  if (subscriptionForms) {
    get.subscriptionForms = true;
    get.plans = true;
    if (isDestination) {
      get.forms = true;
    }
  }

  if (sharedLibraries) {
    get.plans = true;
    get.sharedLibraries = true;
  }

  return get;
}

/**
 * Returns the data required from an xMatters instance for a sync.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance
 * @param {SyncOptions} syncOptions The sync options that control the synchronization.
 * @param {boolean} isDestination
 * @returns {module:common.xMattersData} xMatters Data Object
 */
async function GetSyncData(env, syncOptions, isDestination) {
  const extractOptions = GetExtractOptions(syncOptions, isDestination);
  return await ExtractData(env, extractOptions, syncOptions);
}

/**
 * Extracts data from an xMatters environment according to the options.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance
 * @param {module:sync.ExtractOptions} extractOptions
 * @param {SyncOptions} syncOptions. This function only uses query type (e.g. peopleQuery) and singular object (e.g. person, group, etc.) syncOptions
 * @returns {module:common.xMattersData} xMatters Data Object
 */
async function ExtractData(env, extractOptions, syncOptions) {
  const {
    auditsQuery,
    peopleQuery,
    devicesQuery,
    deviceNamesQuery,
    eventsQuery,
    formsQuery,
    groupsQuery,
    groupMembersQuery,
    importJobsQuery,
    integrationsQuery,
    onCallQuery,
    shiftsQuery,
    sitesQuery,
    dynamicTeamsQuery,
    temporaryAbsencesQuery,
    plansQuery,
    rolesQuery,
    scenariosQuery,
    sharedLibrariesQuery,
    subscriptionsQuery,
    subscriptionFormsQuery,
    device,
    group,
    person,
    plan,
    site,
  } = xm.common.defaultsDeep(syncOptions, DefaultSyncOptions());

  const data = {};

  //gather baseline data from instances.

  if (extractOptions.audits) {
    data.audits = await xm.audits.getMany(env, auditsQuery);
  }

  if (extractOptions.devices) {
    if (person) {
      //get a person's devices
      const identifier = person.targetName || person.id || person;
      data.devices = await xm.people.getDevices(env, devicesQuery, identifier, false);
    } else if (device) {
      //get a single device
      const identifier = device.targetName || device.id || device;
      const _device = await xm.devices.get(env, devicesQuery, identifier, false);
      data.devices = _device ? [_device] : [];
    } else {
      //get all devices
      data.devices = await xm.devices.getMany(env, devicesQuery);
    }
  }

  if (extractOptions.deviceNames) {
    data.deviceNames = await xm.deviceNames.getMany(env, deviceNamesQuery);
  }

  if (extractOptions.deviceTypes) {
    data.deviceTypes = await xm.deviceTypes.getMany(env);
  }

  if (extractOptions.dynamicTeams) {
    data.dynamicTeams = await xm.dynamicTeams.getMany(env, dynamicTeamsQuery);
  }

  if (extractOptions.events) {
    data.events = await xm.events.getMany(env, eventsQuery);
  }

  if (extractOptions.plans) {
    if (plan) {
      const identifier = plan.name || plan.id || plan;
      _plan = await xm.plans.get(env, identifier, plansQuery);
      data.plans = _plan ? [_plan] : [];
    } else {
      data.plans = await xm.plans.getMany(env, plansQuery);
    }
    data.plans = data.plans.filter(plan => plan.planType !== 'RESERVED'); //exclude internal plans being returned.
  }

  if (extractOptions.forms && data.plans) {
    const plansForms = await Promise.all(
      data.plans.map(async ({ id }) => {
        return await xm.forms.getManyInPlan(env, formsQuery, id);
      })
    );

    if (!data.forms) data.forms = [];
    plansForms.map(planForms => (data.forms = data.forms.concat(planForms)));
  }

  if (extractOptions.scenarios && data.forms) {
    //dependent on data.forms
    //collect array of scenario arrays
    const formsScenarios = await Promise.all(
      data.forms.map(async ({ id, plan }) => {
        const planId = plan.id;
        return xm.scenarios.getMany(env, scenariosQuery, id, planId);
      })
    );

    //concatenate scenarios objects into single array.
    if (!data.scenarios) data.scenarios = [];
    formsScenarios.map(formScenarios => (data.scenarios = data.scenarios.concat(formScenarios)));

    //map forms
    data.scenarios = data.scenarios.map(scenario => {
      //not all scenarios have form references. Only map the name for ones that do.
      if (scenario.form) {
        const formId = scenario.form.id || scenario.form;
        const name = data.forms.find(({ id }) => {
          return id === formId;
        }).name;
        scenario.form = { name, id: formId };
      }
      return scenario;
    });
  }

  if (extractOptions.groups) {
    if (group) {
      const identifier = group.targetName || group.id || group;
      const _group = await xm.groups.get(env, identifier, groupsQuery, false);
      data.groups = _group ? [_group] : [];
    } else {
      data.groups = await xm.groups.getMany(env, groupsQuery);
    }
  }

  if (extractOptions.shifts && data.groups) {
    //dependent on data.groups
    // as of 2020-jan-20, there is no ability to get shifts from a groups request
    // so each group must be requested and synced. Also there is not ability to
    // update a shift, only get, delete, and create. A combination of delete
    // and create is used to update shifts.

    //collect array of shift arrays
    const groupsShifts = await Promise.all(
      data.groups.map(async ({ id }) => {
        return xm.shifts.getMany(env, shiftsQuery, id);
      })
    );

    //concatenate shift object into single array.
    if (!data.shifts) data.shifts = [];
    groupsShifts.map(shifts => (data.shifts = data.shifts.concat(shifts)));
  }

  if (extractOptions.groupMembers && data.groups) {
    //dependent on data.groups
    //collect array of groupMembers arrays
    const groupsMembers = await Promise.all(
      data.groups.map(async ({ id }) => {
        return xm.groupMembers.getMany(env, groupMembersQuery, id);
      })
    );

    //concatenate group roster objects into single array.
    if (!data.groupMembers) data.groupMembers = [];
    groupsMembers.map(groupMembers => (data.groupMembers = data.groupMembers.concat(groupMembers)));
  }

  if (extractOptions.onCall && data.groups) {
    //dependent on data.groups

    let groupsIdLists = [];

    for (let i = 0; i < data.groups.length; i += 30) {
      //get comma separated lists of group names in 30 group increments.
      const groupsIdList = data.groups
        .slice(i, i + 30)
        .map(({ id }) => {
          return id;
        })
        .join(',');

      groupsIdLists = groupsIdLists.concat(groupsIdList);
    }

    //collect array of group on calls arrays
    const groupsOnCalls = await Promise.all(
      groupsIdLists.map(async groupsNameList => {
        //copy query
        const _onCallQuery = JSON.parse(JSON.stringify(onCallQuery));

        //assign groups
        _onCallQuery.groups = groupsNameList;
        return xm.onCall.getMany(env, _onCallQuery);
      })
    );

    //concatenate group roster objects into single array.
    if (!data.onCall) data.onCall = [];
    groupsOnCalls.map(groupOnCalls => (data.onCall = data.onCall.concat(groupOnCalls)));
  }

  if (extractOptions.importJobs) {
    data.importJobs = await xm.importJobs.getMany(env, importJobsQuery);
  }

  if (extractOptions.people) {
    if (person) {
      const identifier = person.targetName || person.id || person;
      const _person = await xm.people.get(env, identifier, peopleQuery, false);
      data.people = _person ? [_person] : [];
    } else {
      data.people = await xm.people.getMany(env, peopleQuery);
    }
  }

  if (extractOptions.integrations && data.plans) {
    //data.integrations = ExtractDataFromParent(data.plans, 'plan', 'integrations'); //this does not include logs.
    if (!data.integrations) data.integrations = [];

    //collect array of plan integrations arrays
    const plansIntegrations = await Promise.all(
      data.plans.map(async ({ id }) => {
        return xm.integrations.getMany(env, integrationsQuery, id);
      })
    );

    //concatenate plan integration objects into single array.
    plansIntegrations.map(
      planIntegrations => (data.integrations = data.integrations.concat(planIntegrations))
    );

    //append plan name to plan object in integration before returning. (needed for cross-environment mapping.)
    data.integrations = data.integrations.map(integration => {
      integration.plan.name = data.plans.find(({ id }) => {
        return id === integration.plan.id;
      }).name;
      return integration;
    });

    //map forms
    data.integrations = data.integrations.map(integration => {
      //not all integrations have form references. Only map the name for ones that do.
      if (integration.form) {
        integration.form.name = data.forms.find(({ id }) => {
          return id === integration.form.id;
        }).name;
      }
      return integration;
    });
  }

  if (extractOptions.planConstants && data.plans) {
    //dependent on data.plans
    data.planConstants = ExtractDataFromParent(data.plans, 'plan', 'constants');

    //check total number of constants.if > 100, handle that.
    if (data.planConstants.length === 100) {
      env.log.error(
        new Error(
          'EXTRACT',
          'WARNING: Extraction of the plan constants revealed 100 constants.',
          'The api only includes up to 100',
          'Review xMatters support ticket #152488.',
          'Plan Constants will be requested from each plan as a workaround.'
        )
      );

      //clear current constants
      data.planConstants = [];

      //collect array of plan constants arrays
      const plansConstants = await Promise.all(
        data.plans.map(async ({ id }) => {
          return xm.planConstants.getMany(env, undefined, id);
        })
      );

      //concatenate plan constant objects into single array.
      plansConstants.map(planConstants => (data.planConstants = data.planConstants.concat(planConstants)));

      //append plan name to plan object in plan constants before returning. (needed for cross-environment mapping.)
      data.planConstants = data.planConstants.map(planConstant => {
        planConstant.plan.name = data.plans.find(({ id }) => {
          return id === planConstant.plan.id;
        }).name;
        return planConstant;
      });
    }
  }

  if (extractOptions.planEndpoints && data.plans) {
    //dependent on data.plans
    data.planEndpoints = ExtractDataFromParent(data.plans, 'plan', 'endpoints');
  }

  if (extractOptions.planProperties && data.plans) {
    data.planProperties = ExtractDataFromParent(data.plans, 'plan', 'propertyDefinitions');
  }

  if (extractOptions.sharedLibraries && data.plans) {
    //dependent on data.plans

    if (!data.sharedLibraries) data.sharedLibraries = [];

    //collect array of shared library arrays
    const plansSharedLibraries = await Promise.all(
      data.plans.map(async ({ id }) => {
        return xm.sharedLibraries.getMany(env, sharedLibrariesQuery, id);
      })
    );

    //concatenate shared library objects into single array.
    plansSharedLibraries.map(
      planSharedLibraries => (data.sharedLibraries = data.sharedLibraries.concat(planSharedLibraries))
    );

    //append plan name to plan object in shared library before returning. (needed for cross-environment mapping.)
    /*   data.sharedLibraries = data.sharedLibraries.map(sharedLibrary => {
      sharedLibrary.plan.name = data.plans.find(({ id }) => {
       return id === sharedLibrary.plan.id;
      }).name;
      return sharedLibrary;
    }); */
  }

  if (extractOptions.roles) {
    data.roles = await xm.roles.getMany(env, rolesQuery);
  }

  if (extractOptions.sites) {
    if (site) {
      const identifier = site.name || site.id || site;
      const _site = await xm.sites.get(env, identifier, sitesQuery, false);
      data.sites = _site ? [_site] : [];
    } else {
      data.sites = await xm.sites.getMany(env, sitesQuery);
    }
  }

  if (extractOptions.subscriptionForms && data.plans) {
    const plansSubscriptionForms = await Promise.all(
      data.plans.map(async ({ id }) => {
        return xm.subscriptionForms.getManyInPlan(env, subscriptionFormsQuery, id);
      })
    );

    if (!data.subscriptionForms) data.subscriptionForms = [];
    plansSubscriptionForms.map(
      planSubscriptionForms => (data.subscriptionForms = data.subscriptionForms.concat(planSubscriptionForms))
    );
    data.subscriptionForms = await xm.subscriptionForms.getMany(env, subscriptionFormsQuery);
  }

  if (extractOptions.subscriptions) {
    //HM-XM07142023: Two changes: 1. Filter out subscriptions without any criteria defined as this will break syncing
    // 2. Go back and get all subscribers for any subscriptions that have > 100 recipients because only the first page
    // of 100 is grabbed the first time
    var subscriptionsUnfiltered = await xm.subscriptions.getMany(env, subscriptionsQuery);
    data.subscriptions = subscriptionsUnfiltered.filter(s=>s.criteria && s.criteria != undefined);
    if(subscriptionsUnfiltered.length !== data.subscriptions.length7){
      console.log("Filtered out some subscriptions where CRITERIA was undefined");
    }
    for (let x = 0; x < data.subscriptions.length; x++) {
      if(data.subscriptions[x].recipients && data.subscriptions[x].recipients.total > 100){
        var fullRecipients = await xm.subscriptions.getSubscribers(env, {}, data.subscriptions[x].id);
        data.subscriptions[x].recipients.data = fullRecipients; 
        data.subscriptions[x].recipients.count = fullRecipients.length;
      }
    }
  }

  if (extractOptions.temporaryAbsences) {
    data.temporaryAbsences = await xm.temporaryAbsences.getMany(env, temporaryAbsencesQuery);
  }

  return data;
}

/***
 * Pulls the child objects from the parents using the child object key name.
 * @param {Object[]} parents parent objects
 * @param {string} parentName parent The name of the child key on the parent object.
 * @param {string} childrenName The name of the key for the child on the parent.
 * @returns {Object[] Array of children objects with references to the parent objects.
 */
function ExtractDataFromParent(parents, parentName, childrenName) {
  let results = [];
  //look at each parent
  parents.map(parent => {
    //if child exists in parent and child is paginated data
    if (parent[childrenName] && Array.isArray(parent[childrenName].data)) {
      //append parent name to child object in constant before returning. (needed for cross-environment mapping.)

      //for each child found in parent
      const children = parent[childrenName].data.map(child => {
        //if child doesn't already have parent reference add a reference to the parent's id and assign to the child[parent]
        if (!child[parentName]) {
          child[parentName] = { id: parent.id };
        }

        //set the child[parent].name to the parent's name value.
        child[parentName].name = parent.name;
        return child;
      });
      //concatenate planConstants objects into single array.
      results = results.concat(children);
    }
  });
  return results;
}

/***
 *
 * @param {xMattersObjects} sourceData The xMatters data for the source.
 * @param {xMattersObjects} destinationData The xMatters data for the destination.
 * @param {module:environments.xMattersEnvironment} destination The xmtoolbox representation of the target or destination xMatters instance.
 * @param {*} objectName
 * @param {*} module
 * @param {*} filterFunction
 * @param {Object} options
 * @param {*} parentId
 */
async function ConvertAndSyncObject(
  sourceData,
  destinationData,
  destination,
  objectName,
  module,
  filterFunction,
  transformFunction,
  options
) {
  if (typeof transformFunction === 'function') {
    sourceData[objectName] = sourceData[objectName].map(object =>
      transformFunction(object, sourceData, destinationData)
    );
  }

  //if filter exists, run filter for each data set.
  if (typeof filterFunction === 'function') {
    sourceData[objectName] = sourceData[objectName].filter(filterFunction);
    destinationData[objectName] = destinationData[objectName].filter(filterFunction);
  }

  //if exportToImport function is implemented
  if (typeof xm[module].exportToImport === 'function') {
    //convert data to import ready data using the 'exportToImport' function
    [sourceData[objectName], destinationData[objectName]] = await Promise.all([
      xm[module].exportToImport(destination, sourceData[objectName], destinationData, options),
      xm[module].exportToImport(destination, destinationData[objectName], destinationData, options),
    ]);
  }

  //run module specific sync
  const syncResults = await xm[module].sync(
    destination,
    sourceData[objectName],
    destinationData[objectName],
    options
  );

  //save sync results to destination data object and concatenate results with the existing allObjectName array.
  destinationData.syncResults[objectName] = syncResults;
  destinationData.all[objectName] = destinationData.all[objectName].concat(syncResults.created);

  return;
}

/***
 * Perform ExportToImport and Sync Functions for all synced data in appropriate order.
 * @param {xMattersObjects} sourceData The xMatters data for the source.
 * @param {xMattersObjects} destinationData The xMatters data for the destination.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance.
 * @param {SyncOptions} syncOptions The sync option used to control the sync functionality.
 */
async function ConvertAndSyncObjects(sourceData, destinationData, env, syncOptions) {
  const {
    mirror,
    delayRemoval,
    defaultSupervisorId,
    sites,
    sitesFilter,
    sitesTransform,
    sitesOptions,
    people,
    peopleFilter,
    peopleTransform,
    peopleOptions,
    devices,
    devicesFilter,
    devicesTransform,
    devicesOptions,
    groups,
    groupsFilter,
    groupsTransform,
    groupsOptions,
    shifts,
    shiftsFilter,
    shiftsTransform,
    shiftsOptions,
    dynamicTeams,
    dynamicTeamsFilter,
    dynamicTeamsTransform,
    dynamicTeamsOptions,
    temporaryAbsences,
    temporaryAbsencesFilter,
    temporaryAbsencesTransform,
    temporaryAbsencesOptions,
    plans,
    groupMembers,
    groupMembersOptions,
    groupMembersFilter,
    groupMembersTransform,
    planConstants,
    planEndpoints,
    planProperties,
    scenarios,
    integrations,
    integrationsTransform,
    integrationsFilter,
    integrationsOptions,
    sharedLibraries,
    subscriptions,
    subscriptionForms,
    subscriptionFormsFilter,
    subscriptionFormsOptions,
    subscriptionFormsTransform,
    plansFilter,
    plansTransform,
    plansOptions,
    planConstantsFilter,
    planConstantsTransform,
    planConstantsOptions,
    planEndpointsFilter,
    planEndpointsTransform,
    planEndpointsOptions,
    planPropertiesFilter,
    planPropertiesTransform,
    planPropertiesOptions,
    sharedLibrariesFilter,
    sharedLibrariesTransform,
    sharedLibrariesOptions,
    scenariosFilter,
    scenariosTransform,
    scenariosOptions,
    subscriptionsFilter,
    subscriptionsTransform,
    subscriptionsOptions,
    continueOnError,
  } = xm.common.defaultsDeep(syncOptions, DefaultSyncOptions());

  const _sitesOptions = xm.common.defaultsDeep(sitesOptions, { mirror, delayRemoval, continueOnError });
  const _peopleOptions = xm.common.defaultsDeep(peopleOptions, { mirror, delayRemoval, continueOnError });
  const _devicesOptions = xm.common.defaultsDeep(devicesOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _groupMembersOptions = xm.common.defaultsDeep(groupMembersOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _groupsOptions = xm.common.defaultsDeep(groupsOptions, {
    mirror,
    delayRemoval,
    defaultSupervisorId,
    deleteShiftsOnCreate: true,
    continueOnError,
  });
  const _shiftsOptions = xm.common.defaultsDeep(shiftsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _dynamicTeamsOptions = xm.common.defaultsDeep(dynamicTeamsOptions, {
    mirror,
    delayRemoval,
    defaultSupervisorId,
    continueOnError,
  });
  const _temporaryAbsencesOptions = xm.common.defaultsDeep(temporaryAbsencesOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _integrationsOptions = xm.common.defaultsDeep(integrationsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _plansOptions = xm.common.defaultsDeep(plansOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _planConstantsOptions = xm.common.defaultsDeep(planConstantsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _planEndpointsOptions = xm.common.defaultsDeep(planEndpointsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _planPropertiesOptions = xm.common.defaultsDeep(planPropertiesOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _sharedLibrariesOptions = xm.common.defaultsDeep(sharedLibrariesOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _scenariosOptions = xm.common.defaultsDeep(scenariosOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });
  const _subscriptionsOptions = xm.common.defaultsDeep(subscriptionsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });

  const _subscriptionFormsOptions = xm.common.defaultsDeep(subscriptionFormsOptions, {
    mirror,
    delayRemoval: false,
    continueOnError,
  });

  //create ordered array of object types with supporting options.
  const objectNames = [
    [sites, 'sites', sitesFilter, sitesTransform, _sitesOptions],
    [people, 'people', peopleFilter, peopleTransform, _peopleOptions],
    [devices, 'devices', devicesFilter, devicesTransform, _devicesOptions],
    [groups, 'groups', groupsFilter, groupsTransform, _groupsOptions],
    [shifts, 'shifts', shiftsFilter, shiftsTransform, _shiftsOptions],
    [groupMembers, 'groupMembers', groupMembersFilter, groupMembersTransform, _groupMembersOptions],
    [dynamicTeams, 'dynamicTeams', dynamicTeamsFilter, dynamicTeamsTransform, _dynamicTeamsOptions],
    [
      temporaryAbsences,
      'temporaryAbsences',
      temporaryAbsencesFilter,
      temporaryAbsencesTransform,
      _temporaryAbsencesOptions,
    ],
    [plans, 'plans', plansFilter, plansTransform, _plansOptions],
    [planConstants, 'planConstants', planConstantsFilter, planConstantsTransform, _planConstantsOptions],
    [planEndpoints, 'planEndpoints', planEndpointsFilter, planEndpointsTransform, _planEndpointsOptions],
    [planProperties, 'planProperties', planPropertiesFilter, planPropertiesTransform, _planPropertiesOptions],
    [
      sharedLibraries,
      'sharedLibraries',
      sharedLibrariesFilter,
      sharedLibrariesTransform,
      _sharedLibrariesOptions,
    ],
    [integrations, 'integrations', integrationsFilter, integrationsTransform, _integrationsOptions],
    [scenarios, 'scenarios', scenariosFilter, scenariosTransform, _scenariosOptions],
    [
      subscriptionForms,
      'subscriptionForms',
      subscriptionFormsFilter,
      subscriptionFormsTransform,
      _subscriptionFormsOptions,
    ],
    [subscriptions, 'subscriptions', subscriptionsFilter, subscriptionsTransform, _subscriptionsOptions],
  ];

  //assign all object tracking for cross object sync use.

  //create empty objects to store results.
  sourceData.all = {};
  sourceData.syncResults = {};
  destinationData.all = {};
  destinationData.syncResults = {};

  //assign each retrieved data to the 'all' object.
  objectNames.map(object => {
    const objectName = object[1];
    destinationData.all[objectName] = destinationData[objectName];
  });

  //sync each object type in order.
  try {
    for (let i = 0; i < objectNames.length; i++) {
      const [shouldSync, objectName, filter, transform, options] = objectNames[i];

      xm.common.debug(env.log, { memory: true });

      if (shouldSync) {
        await ConvertAndSyncObject(
          sourceData,
          destinationData,
          env,
          objectName,
          objectName,
          filter,
          transform,
          options
        );
      }
    }
  } catch (error) {
    destinationData.syncResults.failure = true;
    env.log.error(error);
  }
}

async function NonMirrorDelete(env, remove, syncResults, syncOptions) {
  //Remove for non-mirror syncs, delayed and performed in reverse order of dependency

  if (!remove) return;

  //name of the objects to delete from, in order.
  const objectNames = [
    'planConstants',
    'planEndpoints',
    'integrations',
    'sharedLibraries',
    'subscriptions',
    'plans',
    'temporaryAbsenses',
    'groupMembers',
    'shifts',
    'groups',
    'dynamicTeams',
    'devices',
    'people',
    'sites',
  ];
  const { continueOnError } = syncOptions;

  await Promise.all(
    objectNames.map(async objectName => {
      if (remove[objectName] && Array.isArray(remove[objectName])) {
        if (!syncResults[objectName]) syncResults[objectName] = {};
        if (!syncResults[objectName].deleted) syncResults[objectName].deleted = [];

        await Promise.all(
          remove[objectName].map(async object => {
            try {
              let id = object.id || object.targetName || object.name || object;
              let id2 = undefined;

              if (objectName === 'groupMembers') {
                id = object.member.id || object.member.targetName || object.member || object.id;
                id2 = object.group.id || object.group.targetName || object.group;
              } else if (['integrations', 'planConstants', 'planEndpoints'].indexOf(objectName) > -1) {
                id2 = object.plan.id || object.plan.targetName || object.plan;
              } else if (objectName === 'shifts') {
                id2 = object.group.id || object.group.targetName || object.group;
              }

              xm.groupMembers.fields;

              const result = await xm[objectName].delete(env, id, id2);
              syncResults[objectName].deleted.push(result);
            } catch (error) {
              env.log.error(error);
              syncResults[objectName].errors.push({ operation: 'delete', error, object });
              if (!continueOnError) throw error;
            }
          })
        );
      }
    })
  );
}

/***
 * Remove data from xMatters as deemed necessary for a mirror sync. Data is removed in order necessary to minimize dependency issues.
 * @param {module:environments.xMattersEnvironment} env The xmtoolbox representation of an xMatters instance.
 * @param {Object} syncResults Object with keys for each data object set to the sync results. Ex: {groups: syncResults{...}, people: syncResults{...} }
 * @returns {Promise}
 */
async function MirrorOrderedDelete(env, syncResults, syncOptions) {
  //TODO: return a set of functions rather than elements for delayed execution.
  //Remove delayed removals from mirror syncs, delayed and performed in reverse order of dependency

  //name of the objects to delete from, in order.
  const objectNames = ['groups', 'dynamicTeams', 'people', 'sites'];
  const { continueOnError } = syncOptions;

  await Promise.all(
    objectNames.map(async objectName => {
      if (syncResults[objectName] && syncResults[objectName].remove) {
        if (!syncResults[objectName].deleted) {
          syncResults[objectName].deleted = [];
        }

        await Promise.all(
          syncResults[objectName].remove.map(async object => {
            try {
              const result = await xm[objectName].delete(env, object.id);
              syncResults[objectName].deleted.push(result);
            } catch (error) {
              env.log.error(error);
              syncResults[objectName].errors.push({ operation: 'delete', error, object });
              if (!continueOnError) throw error;
            }
          })
        );
      }
    })
  );
}

exports.GetSyncData = GetSyncData;
exports.ExtractData = ExtractData;
exports.xMattersToxMatters = xMattersToxMatters;
exports.DataToxMatters = DataToxMatters;
exports.UserUploadToImport = UserUploadToImport;
exports.DefaultSyncOptions = DefaultSyncOptions;
exports.DefaultExtractOptions = DefaultExtractOptions;


type HatsPlugin = (cb: HatsPluginCallbacks) => {}

type HatsPluginCallbacks = {

}

/**
 * return a client that runs all of the plugins
 * passed to it, enabling their behavior
 * 
 * client creates connections to ws & mqtt and then ties them
 * into an ee2
 * 
 * client then calls those plugins to initiate them
 * passing the set of send* and on* functions
 * (and a logger!  and other utility stuff)
 * that speak and listen to the ee2 broker
 * that the plugins use to add behaviors on 
 */
// is this really registerPlugins?  or startServer?
export const makeHaClient = (plugins: HatsPlugin[]) => {
    // set up ws and mqtt clients, register system handlers
    // for eg connecting, authing, reconnecting, logging to...?
}

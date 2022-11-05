const loadbalancer = {}

loadbalancer.ROUND_ROBIN = function (service) {
    const newIndex = ++service.index >= service.instances.length ? 0 : service.index;
    service.index = newIndex;
    return loadbalancer.isEnabled(service, newIndex, loadbalancer.ROUND_ROBIN);
}

loadbalancer.isEnabled = function (service, index, strategy) {
    return service.instances[index].enabled ? index : strategy(service);
}

module.exports = loadbalancer
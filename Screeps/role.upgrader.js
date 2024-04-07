var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // If Empty and if not upgrading get resources.
        if (creep.store.getFreeCapacity() > 0 && !creep.memory.upgrading) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            //  Upgrade the controller.
            creep.memory.upgrading = true; // Set upgrading flag.
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } else {
                // If upgrading is complete and storage is empty, switch back to harvesting mode.
                if (creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.upgrading = false;
                }
            }
        }
    }
};

module.exports = roleUpgrader;
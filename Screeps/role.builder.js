var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep){
        //find things to build 
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (sites.length > 0) {
            if (creep.build(sites[0]) ===ERR_NOT_IN_RANGE) {
                creep.moveTo(sites[0]);
            }
        } else if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            // Find the nearest energy source
            var energySource = creep.pos.findClosestByPath(FIND_SOURCES);
            // Move to the energy source and harvest it
            if (creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(energySource);
            }
        }
        }

    };

module.exports = roleBuilder
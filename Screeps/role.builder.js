var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Check if the builder is currently building and has no energy
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
        }
        // If the builder is not building and has full energy capacity, switch to building mode
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            // Check if there are available construction sites
            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (constructionSites.length > 0) {
                creep.memory.building = true;
            }
        }
        //If not building, find construction site and build 
        if (creep.memory.building) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite) {
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                return; // Exit the function to prevent harvesting logic from executing
            }
        }
        // Harvest energy
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
};

module.exports = roleBuilder;
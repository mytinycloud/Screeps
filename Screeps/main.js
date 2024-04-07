
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const config = require('./config');


module.exports.loop = function () {

for (const role in config.roles) {
    const roleConfig = config.roles[role];
    const creepsOfType = _.filter(Game.creeps, creep => creep.memory.role === role);
     console.log(`${role}s: ${creepsOfType.length}`);
    
    if (creepsOfType.length < roleConfig.pop) {
        const newName = `${role.charAt(0).toUpperCase()}${role.slice(1)}${Game.time}`;
        console.log(`Spawning new ${role}: ${newName}`);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: { role: role }
        });
    }
}
    
if (Game.spawns['Spawn1'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        `🛠️ ${spawningCreep.memory.role}`,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        { align: 'left', opacity: 0.8 }
    );
}
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
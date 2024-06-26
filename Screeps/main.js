//Roles
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder')
const config = require('./config');
let previousCounts = {};

module.exports.loop = function () {
// gets current counts and limits from ./config
for (const role in config.roles) {
    const roleConfig = config.roles[role];
    const creepsOfType = _.filter(Game.creeps, creep => creep.memory.role === role);
    const currentCount = creepsOfType.length; 
    if (currentCount !== previousCounts[role]) {
        console.log(`${role}s: ${currentCount}`);
        // Update the previous count
        previousCounts[role] = currentCount;
    }
    if (currentCount < roleConfig.pop) {
        const newName = `${role.charAt(0).toUpperCase()}${role.slice(1)}${Game.time}`;
        console.log(`Spawning new ${role}: ${newName}`);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: { role: role }
        });
    }
}
//Spawns creeps and assigns role    
if (Game.spawns['Spawn1'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        `🛠️ ${spawningCreep.memory.role}`,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        { align: 'left', opacity: 0.8 }
    );
}
    
// runs logic for each role 
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
};
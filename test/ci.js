'use strict';

const assert = require('./assert');
const Dex = require('./../dist/sim/dex').Dex;

Dex.includeModData();

Object.entries(Dex.dexes).forEach(function([modId, modDex]) {
	if (['joltemons', 'gennext', 'ssb'].includes(modId)) return; // These mods SUCK

	describe(`Mod: ${modId}`, function () {
		it('should have existing moves', function () {
			for (const move of modDex.moves.all()) {
				assert.equal(Dex.moves.get(move.id).exists, true, `Mod: ${modId} has non-existent move: ${move.id}`);
			}
		});
	
		it('should have existing items', function () {
			for (const item of modDex.items.all()) {
				assert.equal(item.exists, true, `Mod: ${modId} has non-existent item: ${item.id}`);
			}
		});
	
	
		it('should have existing abilities', function () {
			for (const ability of modDex.abilities.all()) {
				assert.equal(ability.exists, true, `Mod: ${modId} has non-existent ability: ${ability.id}`);
			}
		});
	});
});

describe('Formats', function () {
	it('should load all rule tables properly', function () {
		this.timeout(20000);
		for (const format of Dex.formats.all()) {
			assert.doesNotThrow(() => Dex.formats.getRuleTable(format));
		}
	});
});

describe('Moves', function () {
	it.skip('should have descriptions', function () {
		for (const move of Dex.moves.all()) {
			const description = move.desc || move.shortDesc;
			assert(description, `${move.id} does not have a description.`);
		}
	});
});

describe('Items', function () {
	it.skip('should have descriptions', function () {
		for (const item of Dex.items.all()) {
			const description = item.desc || item.shortDesc;
			assert(description, `${item.id} does not have a description.`);
		}
	});
});

describe('Abilities', function () {
	it.skip('should have descriptions', function () {
		for (const ability of Dex.abilities.all()) {
			const description = ability.desc || ability.shortDesc;
			assert(description, `${ability.id} does not have a description.`);
		}
	});
});

describe('Learnsets', function () {
	it('should have valid moves in learnset', function () { 
		for (const species of Dex.species.all()) {
			const learnset = Dex.species.getLearnset(species.id);
			if (learnset === undefined) {
				continue;
			}

			for (const moveId of Object.keys(learnset)) {
				const move = Dex.moves.get(moveId);
				assert.equal(move.exists, true, `${species.id}'s move ${moveId} does not exist.`);
			}
		}
	});
});

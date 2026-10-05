import { world, system } from "@minecraft/server";

const advancements = [
  ["story/root", "Minecraft"],
  ["story/mine_stone", "Stone Age"],
  ["story/upgrade_tools", "Getting an Upgrade"],
  ["story/smelt_iron", "Acquire Hardware"],
  ["story/obtain_armor", "Suit Up"],
  ["story/lava_bucket", "Hot Stuff"],
  ["story/iron_tools", "Isn't It Iron Pick"],
  ["story/deflect_arrow", "Not Today, Thank You"],
  ["story/form_obsidian", "Ice Bucket Challenge"],
  ["story/mine_diamond", "Diamonds!"],
  ["story/enter_the_nether", "We Need to Go Deeper"],
  ["story/shiny_gear", "Cover Me With Diamonds"],
  ["story/enchant_item", "Enchanter"],
  ["story/cure_zombie_villager", "Zombie Doctor"],
  ["story/follow_ender_eye", "Eye Spy"],
  ["story/enter_the_end", "The End?"],

  ["husbandry/root", "Husbandry"],
  ["husbandry/breed_an_animal", "The Parrots and the Bats"],
  ["husbandry/tame_an_animal", "Best Friends Forever"],
  ["husbandry/plant_seed", "A Seedy Place"],
  ["husbandry/bred_all_animals", "Two by Two"],
  ["husbandry/balanced_diet", "A Balanced Diet"],
  ["husbandry/obtain_netherite_hoe", "Serious Dedication"],

  ["adventure/root", "Adventure"],
  ["adventure/kill_a_mob", "Monster Hunter"],
  ["adventure/trade", "What a Deal!"],
  ["adventure/sleep_in_bed", "Sweet Dreams"],
  ["adventure/shoot_arrow", "Take Aim"],
  ["adventure/kill_all_mobs", "Monsters Hunted"],
  ["adventure/totem_of_undying", "Postmortal"],
  ["adventure/summon_iron_golem", "Hired Help"],
  ["adventure/adventuring_time", "Adventuring Time"],
  ["adventure/sniper_duel", "Sniper Duel"],

  ["nether/root", "Nether"],
  ["nether/return_to_sender", "Return to Sender"],
  ["nether/fast_travel", "Subspace Bubble"],
  ["nether/find_fortress", "A Terrible Fortress"],
  ["nether/uneasy_alliance", "Uneasy Alliance"],
  ["nether/get_wither_skull", "Spooky Scary Skeleton"],
  ["nether/obtain_blaze_rod", "Into Fire"],
  ["nether/summon_wither", "Withering Heights"],
  ["nether/brew_potion", "Local Brewery"],
  ["nether/create_beacon", "Bring Home the Beacon"],
  ["nether/all_potions", "A Furious Cocktail"],
  ["nether/create_full_beacon", "Beaconator"],
  ["nether/all_effects", "How Did We Get Here?"],

  ["end/root", "The End"],
  ["end/kill_dragon", "Free the End"],
  ["end/dragon_egg", "The Next Generation"],
  ["end/enter_end_gateway", "Remote Getaway"],
  ["end/respawn_dragon", "The End... Again..."],
  ["end/dragon_breath", "You Need a Mint"],
  ["end/find_end_city", "The City at the End of the Game"],
  ["end/elytra", "Sky's the Limit"],
  ["end/levitate", "Great View From Up Here"],

  ["husbandry/fishy_business", "Fishy Business"],
  ["husbandry/tactical_fishing", "Tactical Fishing"],
  ["adventure/throw_trident", "A Throwaway Joke"],
  ["adventure/very_very_frightening", "Very Very Frightening"],
  ["adventure/ol_betsy", "Ol' Betsy"],
  ["adventure/whos_the_pillager_now", "Who's the Pillager Now?"],
  ["adventure/two_birds_one_arrow", "Two Birds, One Arrow"],
  ["adventure/arbalistic", "Arbalistic"],
  ["husbandry/complete_catalogue", "A Complete Catalogue"],
  ["adventure/voluntary_exile", "Voluntary Exile"],
  ["adventure/hero_of_the_village", "Hero of the Village"],
  ["adventure/honey_block_slide", "Sticky Situation"],
  ["husbandry/safely_harvest_honey", "Bee Our Guest"],
  ["husbandry/silk_touch_nest", "Total Beelocation"],

  ["nether/find_bastion", "Those Were the Days"],
  ["nether/obtain_ancient_debris", "Hidden in the Depths"],
  ["nether/obtain_crying_obsidian", "Who Is Cutting Onions?"],
  ["nether/distract_piglin", "Oh Shiny"],
  ["nether/ride_strider", "This Boat Has Legs"],
  ["nether/loot_bastion", "War Pigs"],
  ["nether/use_lodestone", "Country Lode, Take Me Home"],
  ["nether/netherite_armor", "Cover Me in Debris"],
  ["nether/charge_respawn_anchor", "Not Quite Nine Lives"],
  ["nether/ride_strider_in_overworld_lava", "Feels Like Home"],
  ["nether/explore_nether", "Hot Tourist Destinations"],

  ["adventure/bullseye", "Bullseye"]
];

const PREFIX = "java_advancement:";
const index = new Map(advancements);

function key(id) {
  return PREFIX + id.replace(/[^a-z0-9_:-]/g, "_");
}

function hasAdvancement(player, id) {
  return player.getDynamicProperty(key(id)) === true;
}

function grant(player, id) {
  const title = index.get(id);
  if (!title || hasAdvancement(player, id)) return false;

  player.setDynamicProperty(key(id), true);
  player.sendMessage("§6[Avanço] §e" + title);
  player.sendMessage("§7" + id);
  return true;
}

function grantAll(player) {
  let count = 0;
  for (const [id] of advancements) {
    if (grant(player, id)) count++;
  }
  player.sendMessage("§a[Java Advancements] §f" + count + " avanços concedidos.");
}

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn) return;
  const player = event.player;
  grant(player, "story/root");
  player.sendMessage("§6[Java Advancements] §fSistema carregado: §e" + advancements.length + " avanços.");
  player.sendMessage("§7Teste: use /scriptevent java_advancements:grant_all");
});

// Testes e ferramentas internas. Não alteram os avanços oficiais do Xbox/Microsoft.
system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id !== "java_advancements:grant" && event.id !== "java_advancements:grant_all") return;
  const player = event.sourceEntity;
  if (!player || player.typeId !== "minecraft:player") return;

  if (event.id === "java_advancements:grant_all") {
    grantAll(player);
    return;
  }

  const id = event.message.trim();
  if (!index.has(id)) {
    player.sendMessage("§cAvanço não encontrado: §f" + id);
    return;
  }
  grant(player, id);
});

export { advancements, grant };

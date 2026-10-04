import { world } from "@minecraft/server";

const advancements = [
  ["minecraft:story/root", "Minecraft"],
  ["minecraft:story/mine_stone", "Stone Age"],
  ["minecraft:story/upgrade_tools", "Getting an Upgrade"],
  ["minecraft:story/smelt_iron", "Acquire Hardware"],
  ["minecraft:story/obtain_armor", "Suit Up"],
  ["minecraft:story/lava_bucket", "Hot Stuff"],
  ["minecraft:story/iron_tools", "Isn't It Iron Pick"],
  ["minecraft:story/deflect_arrow", "Not Today, Thank You"],
  ["minecraft:story/form_obsidian", "Ice Bucket Challenge"],
  ["minecraft:story/mine_diamond", "Diamonds!"],
  ["minecraft:story/enter_the_nether", "We Need to Go Deeper"],
  ["minecraft:story/shiny_gear", "Cover Me With Diamonds"],
  ["minecraft:story/enchant_item", "Enchanter"],
  ["minecraft:story/cure_zombie_villager", "Zombie Doctor"],
  ["minecraft:story/follow_ender_eye", "Eye Spy"],
  ["minecraft:story/enter_the_end", "The End?"]
];

world.afterEvents.playerSpawn.subscribe(function(event) {
  if (!event.initialSpawn) return;
  event.player.sendMessage("§6[Java Advancements] §fSistema carregado!");
  event.player.sendMessage("§e" + advancements.length + " avanços-base registrados.");
});

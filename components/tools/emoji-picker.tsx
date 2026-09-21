"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Smile,
  Search,
  Clock,
  SmilePlus,
  Trees,
  UtensilsCrossed,
  Zap,
  Plane,
  Lightbulb,
  Hash,
} from "lucide-react";

type EmojiEntry = { e: string; n: string };
type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  emojis: EmojiEntry[];
};

const CATEGORIES: Category[] = [
  {
    id: "smileys",
    label: "Smileys & Emotion",
    icon: SmilePlus,
    emojis: [
      { e: "😀", n: "grinning face" },
      { e: "😃", n: "grinning face with big eyes" },
      { e: "😄", n: "grinning face with smiling eyes" },
      { e: "😁", n: "beaming face with smiling eyes" },
      { e: "😆", n: "grinning squinting face" },
      { e: "😅", n: "grinning face with sweat" },
      { e: "🤣", n: "rolling on the floor laughing" },
      { e: "😂", n: "face with tears of joy" },
      { e: "🙂", n: "slightly smiling face" },
      { e: "🙃", n: "upside-down face" },
      { e: "😉", n: "winking face" },
      { e: "😊", n: "smiling face with smiling eyes" },
      { e: "😇", n: "smiling face with halo" },
      { e: "🥰", n: "smiling face with hearts" },
      { e: "😍", n: "smiling face with heart-eyes" },
      { e: "🤩", n: "star-struck" },
      { e: "😘", n: "face blowing a kiss" },
      { e: "😗", n: "kissing face" },
      { e: "😚", n: "kissing face with closed eyes" },
      { e: "😙", n: "kissing face with smiling eyes" },
      { e: "🥲", n: "smiling face with tear" },
      { e: "😋", n: "face savoring food" },
      { e: "😛", n: "face with tongue" },
      { e: "😜", n: "winking face with tongue" },
      { e: "🤪", n: "zany face" },
      { e: "😝", n: "squinting face with tongue" },
      { e: "🤑", n: "money-mouth face" },
      { e: "🤗", n: "hugging face" },
      { e: "🤭", n: "face with hand over mouth" },
      { e: "🤫", n: "shushing face" },
      { e: "🤔", n: "thinking face" },
      { e: "🤐", n: "zipper-mouth face" },
      { e: "🤨", n: "face with raised eyebrow" },
      { e: "😐", n: "neutral face" },
      { e: "😑", n: "expressionless face" },
      { e: "😶", n: "face without mouth" },
      { e: "😏", n: "smirking face" },
      { e: "😒", n: "unamused face" },
      { e: "🙄", n: "face with rolling eyes" },
      { e: "😬", n: "grimacing face" },
      { e: "😮‍💨", n: "face exhaling" },
      { e: "🤥", n: "lying face" },
      { e: "😌", n: "relieved face" },
      { e: "😔", n: "pensive face" },
      { e: "😪", n: "sleepy face" },
      { e: "🤤", n: "drooling face" },
      { e: "😴", n: "sleeping face" },
      { e: "😷", n: "face with medical mask" },
      { e: "😎", n: "smiling face with sunglasses" },
      { e: "🥸", n: "disguised face" },
      { e: "🤓", n: "nerd face" },
      { e: "🧐", n: "face with monocle" },
      { e: "😕", n: "confused face" },
      { e: "🫤", n: "face with diagonal mouth" },
      { e: "😟", n: "worried face" },
      { e: "🙁", n: "slightly frowning face" },
      { e: "☹️", n: "frowning face" },
      { e: "😮", n: "face with open mouth" },
      { e: "😯", n: "hushed face" },
      { e: "😲", n: "astonished face" },
      { e: "😳", n: "flushed face" },
      { e: "🥺", n: "pleading face" },
      { e: "🥹", n: "face holding back tears" },
      { e: "😢", n: "crying face" },
      { e: "😭", n: "loudly crying face" },
      { e: "😤", n: "face with steam from nose" },
      { e: "😠", n: "angry face" },
      { e: "😡", n: "pouting face" },
      { e: "🤬", n: "face with symbols on mouth" },
      { e: "🤯", n: "exploding head" },
      { e: "😱", n: "face screaming in fear" },
      { e: "😨", n: "fearful face" },
      { e: "😰", n: "anxious face with sweat" },
      { e: "😥", n: "sad but relieved face" },
      { e: "😓", n: "downcast face with sweat" },
      { e: "🫨", n: "shaking face" },
      { e: "😣", n: "persevering face" },
      { e: "😞", n: "disappointed face" },
      { e: "😖", n: "confounded face" },
      { e: "😫", n: "tired face" },
      { e: "😩", n: "weary face" },
      { e: "😫", n: "tired face" },
      { e: "🥱", n: "yawning face" },
      { e: "😤", n: "face with steam from nose" },
      { e: "😵", n: "face with crossed-out eyes" },
      { e: "😵‍💫", n: "face with spiral eyes" },
      { e: "🤕", n: "face with head-bandage" },
      { e: "🤒", n: "face with thermometer" },
      { e: "🤢", n: "nauseated face" },
      { e: "🤮", n: "face vomiting" },
      { e: "🤧", n: "sneezing face" },
      { e: "🥵", n: "hot face" },
      { e: "🥶", n: "cold face" },
      { e: "🥴", n: "woozy face" },
      { e: "😵", n: "dizzy face" },
      { e: "🤠", n: "cowboy hat face" },
      { e: "🥳", n: "partying face" },
      { e: "😎", n: "smiling face with sunglasses" },
      { e: "🤡", n: "clown face" },
      { e: "👹", n: "ogre" },
      { e: "👺", n: "goblin" },
      { e: "👻", n: "ghost" },
      { e: "👽", n: "alien" },
      { e: "👾", n: "alien monster" },
      { e: "🤖", n: "robot" },
      { e: "😺", n: "grinning cat" },
      { e: "😸", n: "grinning cat with smiling eyes" },
      { e: "😹", n: "cat with tears of joy" },
      { e: "😻", n: "smiling cat with heart-eyes" },
      { e: "😼", n: "cat with wry smile" },
      { e: "😽", n: "kissing cat" },
      { e: "🙀", n: "weary cat" },
      { e: "😿", n: "crying cat" },
      { e: "😾", n: "pouting cat" },
      { e: "🙈", n: "see-no-evil monkey" },
      { e: "🙉", n: "hear-no-evil monkey" },
      { e: "🙊", n: "speak-no-evil monkey" },
      { e: "💌", n: "love letter" },
      { e: "💘", n: "heart with arrow" },
      { e: "💝", n: "heart with ribbon" },
      { e: "💖", n: "sparkling heart" },
      { e: "💗", n: "growing heart" },
      { e: "💓", n: "beating heart" },
      { e: "💞", n: "revolving hearts" },
      { e: "💕", n: "two hearts" },
      { e: "💟", n: "heart decoration" },
      { e: "❣️", n: "heart exclamation" },
      { e: "💔", n: "broken heart" },
      { e: "❤️‍🔥", n: "heart on fire" },
      { e: "❤️‍🩹", n: "mending heart" },
      { e: "❤️", n: "red heart" },
      { e: "🩷", n: "pink heart" },
      { e: "🧡", n: "orange heart" },
      { e: "💛", n: "yellow heart" },
      { e: "💚", n: "green heart" },
      { e: "💙", n: "blue heart" },
      { e: "🩵", n: "light blue heart" },
      { e: "💜", n: "purple heart" },
      { e: "🤎", n: "brown heart" },
      { e: "🖤", n: "black heart" },
      { e: "🩶", n: "grey heart" },
      { e: "🤍", n: "white heart" },
      { e: "💯", n: "hundred points" },
      { e: "💢", n: "anger symbol" },
      { e: "💥", n: "collision" },
      { e: "💫", n: "dizzy" },
      { e: "💦", n: "sweat droplets" },
      { e: "💨", n: "dashing away" },
      { e: "🕳️", n: "hole" },
      { e: "💬", n: "speech balloon" },
      { e: "👁️‍🗨️", n: "eye in speech bubble" },
      { e: "🗨️", n: "left speech bubble" },
      { e: "🗯️", n: "right anger bubble" },
      { e: "💭", n: "thought balloon" },
      { e: "💤", n: "zzz" },
    ],
  },
  {
    id: "people",
    label: "People & Body",
    icon: SmilePlus,
    emojis: [
      { e: "👋", n: "waving hand" },
      { e: "🤚", n: "raised back of hand" },
      { e: "🖐️", n: "hand with fingers splayed" },
      { e: "✋", n: "raised hand" },
      { e: "🖖", n: "vulcan salute" },
      { e: "🫱", n: "rightwards hand" },
      { e: "🫲", n: "leftwards hand" },
      { e: "🫳", n: "palm down hand" },
      { e: "🫴", n: "palm up hand" },
      { e: "👌", n: "OK hand" },
      { e: "🤌", n: "pinched fingers" },
      { e: "🤏", n: "pinching hand" },
      { e: "✌️", n: "victory hand" },
      { e: "🤞", n: "crossed fingers" },
      { e: "🫰", n: "hand with index finger and thumb crossed" },
      { e: "🤟", n: "love-you gesture" },
      { e: "🤙", n: "call me hand" },
      { e: "👈", n: "backhand index pointing left" },
      { e: "👉", n: "backhand index pointing right" },
      { e: "👆", n: "backhand index pointing up" },
      { e: "🖕", n: "middle finger" },
      { e: "👇", n: "backhand index pointing down" },
      { e: "☝️", n: "index pointing up" },
      { e: "🫵", n: "index pointing at the viewer" },
      { e: "👍", n: "thumbs up" },
      { e: "👎", n: "thumbs down" },
      { e: "✊", n: "raised fist" },
      { e: "👊", n: "oncoming fist" },
      { e: "🤛", n: "left-facing fist" },
      { e: "🤜", n: "right-facing fist" },
      { e: "👏", n: "clapping hands" },
      { e: "🙌", n: "raising hands" },
      { e: "👐", n: "open hands" },
      { e: "🤲", n: "palms up together" },
      { e: "🤝", n: "handshake" },
      { e: "🙏", n: "folded hands" },
      { e: "✍️", n: "writing hand" },
      { e: "💅", n: "nail polish" },
      { e: "🤳", n: "selfie" },
      { e: "💪", n: "flexed biceps" },
      { e: "🦾", n: "mechanical arm" },
      { e: "🦿", n: "mechanical leg" },
      { e: "🦵", n: "leg" },
      { e: "🦶", n: "foot" },
      { e: "👂", n: "ear" },
      { e: "🦻", n: "ear with hearing aid" },
      { e: "👃", n: "nose" },
      { e: "🧠", n: "brain" },
      { e: "🫀", n: "anatomical heart" },
      { e: "🫁", n: "lungs" },
      { e: "🦷", n: "tooth" },
      { e: "🦴", n: "bone" },
      { e: "👀", n: "eyes" },
      { e: "👁️", n: "eye" },
      { e: "👅", n: "tongue" },
      { e: "👄", n: "mouth" },
      { e: "🫦", n: "biting lip" },
      { e: "👶", n: "baby" },
      { e: "🧒", n: "child" },
      { e: "👦", n: "boy" },
      { e: "👧", n: "girl" },
      { e: "🧑", n: "person" },
      { e: "👨", n: "man" },
      { e: "👩", n: "woman" },
      { e: "🧔", n: "person with beard" },
      { e: "🧓", n: "older person" },
      { e: "👴", n: "old man" },
      { e: "👵", n: "old woman" },
      { e: "🙍", n: "person frowning" },
      { e: "🙎", n: "person pouting" },
      { e: "🙅", n: "person gesturing NO" },
      { e: "🙆", n: "person gesturing OK" },
      { e: "💁", n: "person tipping hand" },
      { e: "🙋", n: "person raising hand" },
      { e: "🧏", n: "deaf person" },
      { e: "🙇", n: "person bowing" },
      { e: "🤦", n: "person facepalming" },
      { e: "🤷", n: "person shrugging" },
      { e: "🧑‍⚕️", n: "health worker" },
      { e: "👨‍⚕️", n: "man health worker" },
      { e: "👩‍⚕️", n: "woman health worker" },
      // ... (you can add more professions: student, teacher, judge, farmer, cook, mechanic, scientist, artist, pilot, astronaut, firefighter, police, detective, guard, construction worker, prince, princess, etc.)

      { e: "💃", n: "woman dancing" },
      { e: "🕺", n: "man dancing" },
      { e: "🕴️", n: "person in suit levitating" },
      { e: "👯", n: "people with bunny ears" },
      { e: "🧖", n: "person in steamy room" },
      { e: "🧘", n: "person in lotus position" },
      { e: "🧍", n: "person standing" },
      { e: "🧎", n: "person kneeling" },
      { e: "🏃", n: "person running" },
      { e: "🚶", n: "person walking" },
      { e: "🧑‍🦯", n: "person with white cane" },
      { e: "🧑‍🦼", n: "person in motorized wheelchair" },
      { e: "🧑‍🦽", n: "person in manual wheelchair" },
    ],
  },
  {
    id: "nature",
    label: "Animals & Nature",
    icon: Trees,
    emojis: [
      { e: "🐶", n: "dog face" },
      { e: "🐱", n: "cat face" },
      { e: "🐭", n: "mouse face" },
      { e: "🐹", n: "hamster" },
      { e: "🐰", n: "rabbit face" },
      { e: "🦊", n: "fox" },
      { e: "🐻", n: "bear" },
      { e: "🐼", n: "panda" },
      { e: "🐨", n: "koala" },
      { e: "🐯", n: "tiger face" },
      { e: "🦁", n: "lion" },
      { e: "🐮", n: "cow face" },
      { e: "🐸", n: "frog" },
      { e: "🐵", n: "monkey face" },
      { e: "🐔", n: "chicken" },
      { e: "🐧", n: "penguin" },
      { e: "🐦", n: "bird" },
      { e: "🦆", n: "duck" },
      { e: "🦅", n: "eagle" },
      { e: "🦉", n: "owl" },
      { e: "🐺", n: "wolf" },
      { e: "🐗", n: "boar" },
      { e: "🐴", n: "horse face" },
      { e: "🦄", n: "unicorn" },
      { e: "🐝", n: "honeybee" },
      { e: "🐛", n: "bug" },
      { e: "🦋", n: "butterfly" },
      { e: "🐌", n: "snail" },
      { e: "🐞", n: "lady beetle" },
      { e: "🐜", n: "ant" },
      { e: "🦗", n: "cricket" },
      { e: "🕷️", n: "spider" },
      { e: "🦂", n: "scorpion" },
      { e: "🐢", n: "turtle" },
      { e: "🐍", n: "snake" },
      { e: "🦎", n: "lizard" },
      { e: "🦖", n: "T-Rex" },
      { e: "🦕", n: "sauropod" },
      { e: "🐙", n: "octopus" },
      { e: "🦑", n: "squid" },
      { e: "🦀", n: "crab" },
      { e: "🦞", n: "lobster" },
      { e: "🦐", n: "shrimp" },
      { e: "🦪", n: "oyster" },
      { e: "🐠", n: "tropical fish" },
      { e: "🐟", n: "fish" },
      { e: "🐡", n: "blowfish" },
      { e: "🐬", n: "dolphin" },
      { e: "🦈", n: "shark" },
      { e: "🐳", n: "spouting whale" },
      { e: "🐋", n: "whale" },
      { e: "🐊", n: "crocodile" },
      { e: "🐆", n: "leopard" },
      { e: "🐅", n: "tiger" },
      { e: "🐃", n: "water buffalo" },
      { e: "🐂", n: "ox" },
      { e: "🐄", n: "cow" },
      { e: "🐎", n: "horse" },
      { e: "🦓", n: "zebra" },
      { e: "🦒", n: "giraffe" },
      { e: "🦏", n: "rhinoceros" },
      { e: "🦛", n: "hippopotamus" },
      { e: "🐘", n: "elephant" },
      { e: "🐫", n: "two-hump camel" },
      { e: "🐪", n: "camel" },
      { e: "🦙", n: "llama" },
      { e: "🦥", n: "sloth" },
      { e: "🦦", n: "otter" },
      { e: "🦨", n: "skunk" },
      { e: "🦘", n: "kangaroo" },
      { e: "🦡", n: "badger" },
      { e: "🐾", n: "paw prints" },
      { e: "🌵", n: "cactus" },
      { e: "🎄", n: "Christmas tree" },
      { e: "🌲", n: "evergreen tree" },
      { e: "🌳", n: "deciduous tree" },
      { e: "🌴", n: "palm tree" },
      { e: "🌱", n: "seedling" },
      { e: "🌿", n: "herb" },
      { e: "☘️", n: "shamrock" },
      { e: "🍀", n: "four leaf clover" },
      { e: "🎍", n: "pine decoration" },
      { e: "🎋", n: "tanabata tree" },
      { e: "🍃", n: "leaf fluttering in wind" },
      { e: "🍂", n: "fallen leaf" },
      { e: "🍁", n: "maple leaf" },
      { e: "🌾", n: "sheaf of rice" },
      { e: "🌺", n: "hibiscus" },
      { e: "🌻", n: "sunflower" },
      { e: "🌹", n: "rose" },
      { e: "🥀", n: "wilted flower" },
      { e: "🌷", n: "tulip" },
      { e: "🌼", n: "blossom" },
      { e: "🌸", n: "cherry blossom" },
      { e: "💐", n: "bouquet" },
      { e: "🌎", n: "globe showing Americas" },
      { e: "🌍", n: "globe showing Europe-Africa" },
      { e: "🌏", n: "globe showing Asia-Australia" },
      { e: "🌐", n: "globe with meridians" },
      { e: "🌑", n: "new moon" },
      { e: "🌒", n: "waxing crescent moon" },
      { e: "🌓", n: "first quarter moon" },
      { e: "🌔", n: "waxing gibbous moon" },
      { e: "🌕", n: "full moon" },
      { e: "🌖", n: "waning gibbous moon" },
      { e: "🌗", n: "last quarter moon" },
      { e: "🌘", n: "waning crescent moon" },
      { e: "🌙", n: "crescent moon" },
      { e: "🌚", n: "new moon face" },
      { e: "🌛", n: "first quarter moon face" },
      { e: "🌜", n: "last quarter moon face" },
      { e: "🌡️", n: "thermometer" },
      { e: "☀️", n: "sun" },
      { e: "🌝", n: "full moon face" },
      { e: "🌞", n: "sun with face" },
      { e: "🪐", n: "ringed planet" },
      { e: "⭐", n: "star" },
      { e: "🌟", n: "glowing star" },
      { e: "🌠", n: "shooting star" },
      { e: "🌌", n: "milky way" },
      { e: "☁️", n: "cloud" },
      { e: "⛅", n: "sun behind cloud" },
      { e: "⛈️", n: "cloud with lightning and rain" },
      { e: "🌩️", n: "cloud with lightning" },
      { e: "🌧️", n: "cloud with rain" },
      { e: "🌨️", n: "cloud with snow" },
      { e: "🌥️", n: "cloud with rain" }, // variants
      { e: "🌦️", n: "sun behind rain cloud" },
      { e: "🌪️", n: "tornado" },
      { e: "🌫️", n: "fog" },
      { e: "🌬️", n: "wind face" },
      { e: "🌈", n: "rainbow" },
      { e: "☂️", n: "umbrella" },
      { e: "☔", n: "umbrella with rain drops" },
      { e: "⚡", n: "high voltage" },
      { e: "❄️", n: "snowflake" },
      { e: "☃️", n: "snowman" },
      { e: "⛄", n: "snowman without snow" },
      { e: "☄️", n: "comet" },
      { e: "🔥", n: "fire" },
      { e: "💧", n: "droplet" },
      { e: "🌊", n: "water wave" },
    ],
  },
  {
    id: "food",
    label: "Food & Drink",
    icon: UtensilsCrossed,
    emojis: [
      { e: "🍏", n: "green apple" },
      { e: "🍎", n: "red apple" },
      { e: "🍐", n: "pear" },
      { e: "🍊", n: "tangerine" },
      { e: "🍋", n: "lemon" },
      { e: "🍌", n: "banana" },
      { e: "🍉", n: "watermelon" },
      { e: "🍇", n: "grapes" },
      { e: "🍓", n: "strawberry" },
      { e: "🫐", n: "blueberries" },
      { e: "🍈", n: "melon" },
      { e: "🍒", n: "cherries" },
      { e: "🍑", n: "peach" },
      { e: "🥭", n: "mango" },
      { e: "🍍", n: "pineapple" },
      { e: "🥥", n: "coconut" },
      { e: "🥝", n: "kiwi fruit" },
      { e: "🍅", n: "tomato" },
      { e: "🫒", n: "olive" },
      { e: "🥑", n: "avocado" },
      { e: "🍆", n: "eggplant" },
      { e: "🥔", n: "potato" },
      { e: "🥕", n: "carrot" },
      { e: "🌽", n: "ear of corn" },
      { e: "🌶️", n: "hot pepper" },
      { e: "🫑", n: "bell pepper" },
      { e: "🥒", n: "cucumber" },
      { e: "🥬", n: "leafy green" },
      { e: "🥦", n: "broccoli" },
      { e: "🧄", n: "garlic" },
      { e: "🧅", n: "onion" },
      { e: "🍄", n: "mushroom" },
      { e: "🥜", n: "peanuts" },
      { e: "🫘", n: "beans" },
      { e: "🌰", n: "chestnut" },
      { e: "🍞", n: "bread" },
      { e: "🥐", n: "croissant" },
      { e: "🥖", n: "baguette bread" },
      { e: "🫓", n: "flatbread" },
      { e: "🥨", n: "pretzel" },
      { e: "🥯", n: "bagel" },
      { e: "🥞", n: "pancakes" },
      { e: "🧇", n: "waffle" },
      { e: "🧀", n: "cheese wedge" },
      { e: "🍖", n: "meat on bone" },
      { e: "🍗", n: "poultry leg" },
      { e: "🥩", n: "cut of meat" },
      { e: "🥓", n: "bacon" },
      { e: "🍔", n: "hamburger" },
      { e: "🍟", n: "french fries" },
      { e: "🍕", n: "pizza" },
      { e: "🌭", n: "hot dog" },
      { e: "🥪", n: "sandwich" },
      { e: "🌮", n: "taco" },
      { e: "🌯", n: "burrito" },
      { e: "🫔", n: "tamale" },
      { e: "🥙", n: "stuffed flatbread" },
      { e: "🧆", n: "falafel" },
      { e: "🥚", n: "egg" },
      { e: "🍳", n: "cooking" },
      { e: "🥘", n: "shallow pan of food" },
      { e: "🍲", n: "pot of food" },
      { e: "🫕", n: "fondue" },
      { e: "🥣", n: "bowl with spoon" },
      { e: "🥗", n: "green salad" },
      { e: "🍿", n: "popcorn" },
      { e: "🧈", n: "butter" },
      { e: "🧂", n: "salt" },
      { e: "🥫", n: "canned food" },
      { e: "🍱", n: "bento box" },
      { e: "🍘", n: "rice cracker" },
      { e: "🍙", n: "rice ball" },
      { e: "🍚", n: "cooked rice" },
      { e: "🍛", n: "curry rice" },
      { e: "🍜", n: "steaming bowl" },
      { e: "🍝", n: "spaghetti" },
      { e: "🍠", n: "roasted sweet potato" },
      { e: "🍢", n: "oden" },
      { e: "🍣", n: "sushi" },
      { e: "🍤", n: "fried shrimp" },
      { e: "🍥", n: "fish cake with swirl" },
      { e: "🥮", n: "moon cake" },
      { e: "🍡", n: "dango" },
      { e: "🥟", n: "dumpling" },
      { e: "🥠", n: "fortune cookie" },
      { e: "🥡", n: "takeout box" },
      { e: "🍦", n: "soft ice cream" },
      { e: "🍧", n: "shaved ice" },
      { e: "🍨", n: "ice cream" },
      { e: "🍩", n: "doughnut" },
      { e: "🍪", n: "cookie" },
      { e: "🎂", n: "birthday cake" },
      { e: "🍰", n: "shortcake" },
      { e: "🧁", n: "cupcake" },
      { e: "🥧", n: "pie" },
      { e: "🍫", n: "chocolate bar" },
      { e: "🍬", n: "candy" },
      { e: "🍭", n: "lollipop" },
      { e: "🍮", n: "custard" },
      { e: "🍯", n: "honey pot" },
      { e: "🍼", n: "baby bottle" },
      { e: "🥛", n: "glass of milk" },
      { e: "☕", n: "hot beverage" },
      { e: "🫖", n: "teapot" },
      { e: "🍵", n: "teacup without handle" },
      { e: "🍶", n: "sake" },
      { e: "🍾", n: "bottle with popping cork" },
      { e: "🍷", n: "wine glass" },
      { e: "🍸", n: "cocktail glass" },
      { e: "🍹", n: "tropical drink" },
      { e: "🍺", n: "beer mug" },
      { e: "🍻", n: "clinking beer mugs" },
      { e: "🥂", n: "clinking glasses" },
      { e: "🥃", n: "tumbler glass" },
      { e: "🫗", n: "pouring liquid" },
      { e: "🥤", n: "cup with straw" },
      { e: "🧋", n: "bubble tea" },
      { e: "🧃", n: "beverage box" },
      { e: "🧉", n: "mate" },
      { e: "🧊", n: "ice" },
      { e: "🥢", n: "chopsticks" },
      { e: "🍽️", n: "fork and knife with plate" },
      { e: "🍴", n: "fork and knife" },
      { e: "🥄", n: "spoon" },
    ],
  },
  {
    id: "activity",
    label: "Activities",
    icon: Zap,
    emojis: [
      { e: "⚽", n: "soccer ball" },
      { e: "🏀", n: "basketball" },
      { e: "🏈", n: "american football" },
      { e: "⚾", n: "baseball" },
      { e: "🥎", n: "softball" },
      { e: "🎾", n: "tennis" },
      { e: "🏐", n: "volleyball" },
      { e: "🏉", n: "rugby football" },
      { e: "🥏", n: "flying disc" },
      { e: "🎱", n: "pool 8 ball" },
      { e: "🪀", n: "yo-yo" },
      { e: "🏓", n: "ping pong" },
      { e: "🏸", n: "badminton" },
      { e: "🏒", n: "ice hockey" },
      { e: "🏑", n: "field hockey" },
      { e: "🥍", n: "lacrosse" },
      { e: "🏏", n: "cricket game" },
      { e: "🪃", n: "boomerang" },
      { e: "🥅", n: "goal net" },
      { e: "⛳", n: "flag in hole" },
      { e: "🪁", n: "kite" },
      { e: "🛹", n: "skateboard" },
      { e: "🛼", n: "roller skate" },
      { e: "🛷", n: "sled" },
      { e: "⛸️", n: "ice skate" },
      { e: "🥌", n: "curling stone" },
      { e: "🎿", n: "skis" },
      { e: "🎣", n: "fishing pole" },
      { e: "🤿", n: "diving mask" },
      { e: "🎽", n: "running shirt" },
      { e: "🎖️", n: "military medal" },
      { e: "🏅", n: "sports medal" },
      { e: "🏆", n: "trophy" },
      { e: "🥇", n: "1st place medal" },
      { e: "🥈", n: "2nd place medal" },
      { e: "🥉", n: "3rd place medal" },
      { e: "🎪", n: "circus tent" },
      { e: "🎭", n: "performing arts" },
      { e: "🩰", n: "ballet shoes" },
      { e: "🎨", n: "artist palette" },
      { e: "🧵", n: "thread" },
      { e: "🪡", n: "sewing needle" },
      { e: "🧶", n: "yarn" },
      { e: "🪢", n: "knot" },
      { e: "🎤", n: "microphone" },
      { e: "🎧", n: "headphone" },
      { e: "🎷", n: "saxophone" },
      { e: "🪗", n: "accordion" },
      { e: "🎸", n: "guitar" },
      { e: "🎹", n: "musical keyboard" },
      { e: "🎺", n: "trumpet" },
      { e: "🎻", n: "violin" },
      { e: "🪕", n: "banjo" },
      { e: "🥁", n: "drum" },
      { e: "🪘", n: "long drum" },
      { e: "🎬", n: "clapper board" },
      { e: "🎥", n: "movie camera" },
      { e: "🎞️", n: "film frames" },
      { e: "📽️", n: "film projector" },
      { e: "🎞️", n: "film strip" },
      { e: "📷", n: "camera" },
      { e: "📸", n: "camera with flash" },
      { e: "📹", n: "video camera" },
      { e: "📼", n: "videocassette" },
      { e: "🔍", n: "magnifying glass tilted left" },
      { e: "🔎", n: "magnifying glass tilted right" },
      { e: "🕯️", n: "candle" },
      { e: "💡", n: "light bulb" },
      { e: "🔦", n: "flashlight" },
      { e: "🏮", n: "red paper lantern" },
      { e: "🪔", n: "diya lamp" },
      { e: "📔", n: "notebook with decorative cover" },
      { e: "📕", n: "closed book" },
      { e: "📖", n: "open book" },
      { e: "📗", n: "green book" },
      { e: "📘", n: "blue book" },
      { e: "📙", n: "orange book" },
      { e: "📚", n: "books" },
      { e: "📓", n: "notebook" },
      { e: "📒", n: "ledger" },
      { e: "📃", n: "page with curl" },
      { e: "📜", n: "scroll" },
      { e: "📄", n: "page facing up" },
      { e: "📰", n: "newspaper" },
      { e: "🗞️", n: "rolled-up newspaper" },
      { e: "📑", n: "bookmark tabs" },
      { e: "🔖", n: "bookmark" },
      { e: "🏷️", n: "label" },
      { e: "💰", n: "money bag" },
      { e: "🪙", n: "coin" },
      { e: "💴", n: "yen banknote" },
      { e: "💵", n: "dollar banknote" },
      { e: "💶", n: "euro banknote" },
      { e: "💷", n: "pound banknote" },
      { e: "💸", n: "money with wings" },
      { e: "💳", n: "credit card" },
      { e: "🧾", n: "receipt" },
      { e: "💹", n: "chart increasing with yen" },
      { e: "✉️", n: "envelope" },
      { e: "📧", n: "e-mail" },
      { e: "📨", n: "incoming envelope" },
      { e: "📩", n: "envelope with arrow" },
      { e: "📤", n: "outbox tray" },
      { e: "📥", n: "inbox tray" },
      { e: "📦", n: "package" },
      { e: "📫", n: "closed mailbox with raised flag" },
      { e: "📪", n: "closed mailbox with lowered flag" },
      { e: "📬", n: "open mailbox with raised flag" },
      { e: "📭", n: "open mailbox with lowered flag" },
      { e: "📮", n: "postbox" },
      { e: "🗳️", n: "ballot box with ballot" },
    ],
  },
  {
    id: "travel",
    label: "Travel & Places",
    icon: Plane,
    emojis: [
      { e: "🚗", n: "automobile" },
      { e: "🚕", n: "taxi" },
      { e: "🚙", n: "sport utility vehicle" },
      { e: "🚌", n: "bus" },
      { e: "🚎", n: "trolleybus" },
      { e: "🏎️", n: "racing car" },
      { e: "🚓", n: "police car" },
      { e: "🚑", n: "ambulance" },
      { e: "🚒", n: "fire engine" },
      { e: "🚐", n: "minibus" },
      { e: "🛻", n: "pickup truck" },
      { e: "🚚", n: "delivery truck" },
      { e: "🚛", n: "articulated lorry" },
      { e: "🚜", n: "tractor" },
      { e: "🏍️", n: "motorcycle" },
      { e: "🛵", n: "motor scooter" },
      { e: "🦽", n: "manual wheelchair" },
      { e: "🦼", n: "motorized wheelchair" },
      { e: "🛺", n: "auto rickshaw" },
      { e: "🚲", n: "bicycle" },
      { e: "🛴", n: "kick scooter" },
      { e: "🛹", n: "skateboard" },
      { e: "🚨", n: "police car light" },
      { e: "🚔", n: "oncoming police car" },
      { e: "🚍", n: "oncoming bus" },
      { e: "🚘", n: "oncoming automobile" },
      { e: "🚖", n: "oncoming taxi" },
      { e: "✈️", n: "airplane" },
      { e: "🛫", n: "airplane departure" },
      { e: "🛬", n: "airplane arrival" },
      { e: "🛩️", n: "small airplane" },
      { e: "🚁", n: "helicopter" },
      { e: "🚟", n: "suspension railway" },
      { e: "🚠", n: "mountain cableway" },
      { e: "🚡", n: "aerial tramway" },
      { e: "🛰️", n: "satellite" },
      { e: "🚀", n: "rocket" },
      { e: "🛸", n: "flying saucer" },
      { e: "🚂", n: "locomotive" },
      { e: "🚃", n: "railway car" },
      { e: "🚄", n: "high-speed train" },
      { e: "🚅", n: "bullet train" },
      { e: "🚆", n: "train" },
      { e: "🚇", n: "metro" },
      { e: "🚈", n: "light rail" },
      { e: "🚉", n: "station" },
      { e: "🚊", n: "tram" },
      { e: "🚝", n: "monorail" },
      { e: "🚞", n: "mountain railway" },
      { e: "🚋", n: "tram car" },
      { e: "🚎", n: "trolleybus" },
      { e: "🚏", n: "bus stop" },
      { e: "🛤️", n: "railway track" },
      { e: "⛽", n: "fuel pump" },
      { e: "🛣️", n: "motorway" },
      { e: "🛤️", n: "railway track" },
      { e: "🛠️", n: "hammer and wrench" }, // tools sometimes here
      { e: "⛵", n: "sailboat" },
      { e: "🛶", n: "canoe" },
      { e: "🚤", n: "speedboat" },
      { e: "🛳️", n: "passenger ship" },
      { e: "⛴️", n: "ferry" },
      { e: "🛥️", n: "motor boat" },
      { e: "🚢", n: "ship" },
      { e: "🪝", n: "hook" },
      { e: "🪣", n: "bucket" },
      { e: "🏗️", n: "building construction" },
      { e: "🏘️", n: "houses" },
      { e: "🏚️", n: "derelict house" },
      { e: "🏠", n: "house" },
      { e: "🏡", n: "house with garden" },
      { e: "🏢", n: "office building" },
      { e: "🏣", n: "Japanese post office" },
      { e: "🏤", n: "post office" },
      { e: "🏥", n: "hospital" },
      { e: "🏦", n: "bank" },
      { e: "🏨", n: "hotel" },
      { e: "🏩", n: "love hotel" },
      { e: "🏪", n: "convenience store" },
      { e: "🏫", n: "school" },
      { e: "🏬", n: "department store" },
      { e: "🏭", n: "factory" },
      { e: "🏯", n: "Japanese castle" },
      { e: "🏰", n: "castle" },
      { e: "💒", n: "wedding" },
      { e: "🗼", n: "Tokyo tower" },
      { e: "🗽", n: "Statue of Liberty" },
      { e: "⛪", n: "church" },
      { e: "🕌", n: "mosque" },
      { e: "🛕", n: "hindu temple" },
      { e: "🕍", n: "synagogue" },
      { e: "⛩️", n: "shinto shrine" },
      { e: "🕋", n: "kaaba" },
      { e: "⛲", n: "fountain" },
      { e: "⛺", n: "tent" },
      { e: "🌁", n: "foggy" },
      { e: "🌃", n: "night with stars" },
      { e: "🏙️", n: "cityscape" },
      { e: "🌄", n: "sunrise over mountains" },
      { e: "🌅", n: "sunrise" },
      { e: "🌆", n: "cityscape at dusk" },
      { e: "🌇", n: "sunset" },
      { e: "🌉", n: "bridge at night" },
      { e: "♨️", n: "hot springs" },
      { e: "🎠", n: "carousel horse" },
      { e: "🎡", n: "ferris wheel" },
      { e: "🎢", n: "roller coaster" },
      { e: "💈", n: "barber pole" },
      { e: "🎪", n: "circus tent" },
      { e: "🎭", n: "performing arts" },
      { e: "🛎️", n: "bellhop bell" },
      { e: "🧳", n: "luggage" },
      { e: "⌛", n: "hourglass done" },
      { e: "⏳", n: "hourglass not done" },
      { e: "⌚", n: "watch" },
      { e: "⏰", n: "alarm clock" },
      { e: "⏱️", n: "stopwatch" },
      { e: "⏲️", n: "timer clock" },
      { e: "🕰️", n: "mantelpiece clock" },
      { e: "🕛", n: "twelve o’clock" },
      // ... add more clock faces if needed
    ],
  },
  {
    id: "objects",
    label: "Objects",
    icon: Lightbulb,
    emojis: [
      { e: "💡", n: "light bulb" },
      { e: "🔦", n: "flashlight" },
      { e: "📱", n: "mobile phone" },
      { e: "📲", n: "mobile phone with arrow" },
      { e: "💻", n: "laptop" },
      { e: "⌨️", n: "keyboard" },
      { e: "🖥️", n: "desktop computer" },
      { e: "🖨️", n: "printer" },
      { e: "🖱️", n: "computer mouse" },
      { e: "🖲️", n: "trackball" },
      { e: "💽", n: "computer disk" },
      { e: "💾", n: "floppy disk" },
      { e: "💿", n: "optical disk" },
      { e: "📀", n: "dvd" },
      { e: "📼", n: "videocassette" },
      { e: "📷", n: "camera" },
      { e: "📸", n: "camera with flash" },
      { e: "📹", n: "video camera" },
      { e: "📺", n: "television" },
      { e: "📻", n: "radio" },
      { e: "🎙️", n: "studio microphone" },
      { e: "🎚️", n: "level slider" },
      { e: "🎛️", n: "control knobs" },
      { e: "🧭", n: "compass" },
      { e: "⏱️", n: "stopwatch" },
      { e: "⏲️", n: "timer clock" },
      { e: "⌛", n: "hourglass" },
      { e: "🕰️", n: "mantelpiece clock" },
      { e: "⌚", n: "watch" },
      { e: "📡", n: "satellite antenna" },
      { e: "🔋", n: "battery" },
      { e: "🪫", n: "low battery" },
      { e: "🔌", n: "electric plug" },
      { e: "💡", n: "light bulb" },
      { e: "🔦", n: "flashlight" },
      { e: "🕯️", n: "candle" },
      { e: "🪔", n: "diya lamp" },
      { e: "🔑", n: "key" },
      { e: "🗝️", n: "old key" },
      { e: "🔨", n: "hammer" },
      { e: "🪓", n: "axe" },
      { e: "⛏️", n: "pick" },
      { e: "⚒️", n: "hammer and pick" },
      { e: "🛠️", n: "hammer and wrench" },
      { e: "🪚", n: "carpentry saw" },
      { e: "🔧", n: "wrench" },
      { e: "🪛", n: "screwdriver" },
      { e: "🔩", n: "nut and bolt" },
      { e: "⚙️", n: "gear" },
      { e: "🧱", n: "brick" },
      { e: "🪜", n: "ladder" },
      { e: "🪝", n: "hook" },
      { e: "🧲", n: "magnet" },
      { e: "🧰", n: "toolbox" },
      { e: "🪜", n: "ladder" },
      { e: "🧪", n: "test tube" },
      { e: "🧫", n: "petri dish" },
      { e: "🧬", n: "dna" },
      { e: "🔬", n: "microscope" },
      { e: "🔭", n: "telescope" },
      { e: "📡", n: "satellite antenna" },
      { e: "💉", n: "syringe" },
      { e: "🩸", n: "drop of blood" },
      { e: "💊", n: "pill" },
      { e: "🩹", n: "adhesive bandage" },
      { e: "🩼", n: "crutch" },
      { e: "🩺", n: "stethoscope" },
      { e: "🩻", n: "x-ray" },
      { e: "🚪", n: "door" },
      { e: "🛗", n: "elevator" },
      { e: "🪟", n: "window" },
      { e: "🛏️", n: "bed" },
      { e: "🛋️", n: "couch and lamp" },
      { e: "🪑", n: "chair" },
      { e: "🚽", n: "toilet" },
      { e: "🪠", n: "plunger" },
      { e: "🚿", n: "shower" },
      { e: "🛁", n: "bathtub" },
      { e: "🪤", n: "mouse trap" },
      { e: "🪒", n: "razor" },
      { e: "🧴", n: "lotion bottle" },
      { e: "🧷", n: "safety pin" },
      { e: "🧹", n: "broom" },
      { e: "🧺", n: "basket" },
      { e: "🧻", n: "roll of paper" },
      { e: "🪣", n: "bucket" },
      { e: "🧼", n: "soap" },
      { e: "🫧", n: "bubbles" },
      { e: "🪥", n: "toothbrush" },
      { e: "🧽", n: "sponge" },
      { e: "🧯", n: "fire extinguisher" },
      { e: "🛒", n: "shopping cart" },
      { e: "🚬", n: "cigarette" },
      { e: "⚰️", n: "coffin" },
      { e: "🪦", n: "headstone" },
      { e: "⚱️", n: "funeral urn" },
      { e: "🧿", n: "nazar amulet" },
      { e: "🪬", n: "hamsa" },
      { e: "🗿", n: "moai" },
      { e: "🪧", n: "placard" },
      { e: "🪪", n: "identification card" },
    ],
  },
  {
    id: "symbols",
    label: "Symbols",
    icon: Hash,
    emojis: [
      { e: "❤️", n: "red heart" },
      { e: "🧡", n: "orange heart" },
      { e: "💛", n: "yellow heart" },
      { e: "💚", n: "green heart" },
      { e: "💙", n: "blue heart" },
      { e: "💜", n: "purple heart" },
      { e: "🖤", n: "black heart" },
      { e: "🤍", n: "white heart" },
      { e: "💔", n: "broken heart" },
      { e: "❣️", n: "heart exclamation" },
      { e: "💕", n: "two hearts" },
      { e: "💞", n: "revolving hearts" },
      { e: "💓", n: "beating heart" },
      { e: "💗", n: "growing heart" },
      { e: "💖", n: "sparkling heart" },
      { e: "💘", n: "heart with arrow" },
      { e: "💝", n: "heart with ribbon" },
      { e: "💟", n: "heart decoration" },
      { e: "☮️", n: "peace symbol" },
      { e: "✝️", n: "latin cross" },
      { e: "☪️", n: "star and crescent" },
      { e: "🕉️", n: "om" },
      { e: "☸️", n: "wheel of dharma" },
      { e: "✡️", n: "star of David" },
      { e: "🔯", n: "dotted six-pointed star" },
      { e: "🪯", n: "khanda" },
      { e: "☯️", n: "yin yang" },
      { e: "☦️", n: "orthodox cross" },
      { e: "🛐", n: "place of worship" },
      { e: "⛎", n: "ophiuchus" },
      { e: "♈", n: "aries" },
      { e: "♉", n: "taurus" },
      { e: "♊", n: "gemini" },
      { e: "♋", n: "cancer" },
      { e: "♌", n: "leo" },
      { e: "♍", n: "virgo" },
      { e: "♎", n: "libra" },
      { e: "♏", n: "scorpio" },
      { e: "♐", n: "sagittarius" },
      { e: "♑", n: "capricorn" },
      { e: "♒", n: "aquarius" },
      { e: "♓", n: "pisces" },
      { e: "🆔", n: "ID button" },
      { e: "⚛️", n: "atom symbol" },
      { e: "🉑", n: "Japanese “acceptable” button" },
      { e: "☢️", n: "radioactive" },
      { e: "☣️", n: "biohazard" },
      { e: "📴", n: "mobile phone off" },
      { e: "📳", n: "vibration mode" },
      { e: "🈶", n: "Japanese “not free of charge” button" },
      { e: "🈚", n: "Japanese “free of charge” button" },
      { e: "🈸", n: "Japanese “application” button" },
      { e: "🈺", n: "Japanese “open for business” button" },
      { e: "🈷️", n: "Japanese “monthly amount” button" },
      { e: "✴️", n: "eight-pointed star" },
      { e: "🆚", n: "VS button" },
      { e: "🉐", n: "Japanese “bargain” button" },
      { e: "💮", n: "white flower" },
      { e: "🉑", n: "Japanese “acceptable” button" },
      { e: "㊙️", n: "Japanese “secret” button" },
      { e: "㊗️", n: "Japanese “congratulations” button" },
      { e: "🈴", n: "Japanese “passing grade” button" },
      { e: "🈵", n: "Japanese “no vacancy” button" },
      { e: "🈹", n: "Japanese “discount” button" },
      { e: "🈲", n: "Japanese “prohibited” button" },
      { e: "🅰️", n: "A button (blood type)" },
      { e: "🅱️", n: "B button (blood type)" },
      { e: "🆎", n: "AB button (blood type)" },
      { e: "🅾️", n: "O button (blood type)" },
      { e: "🆑", n: "CL button" },
      { e: "🆒", n: "COOL button" },
      { e: "🆓", n: "FREE button" },
      { e: "🆕", n: "NEW button" },
      { e: "🆖", n: "NG button" },
      { e: "🆗", n: "OK button" },
      { e: "🆘", n: "SOS button" },
      { e: "🆙", n: "UP! button" },
      { e: "🆚", n: "VS button" },
      { e: "🈁", n: "Japanese “here” button" },
      { e: "🈂️", n: "Japanese “service charge” button" },
      { e: "🈷️", n: "Japanese “monthly amount” button" },
      { e: "🈶", n: "Japanese “not free of charge” button" },
      { e: "🈯", n: "Japanese “reserved” button" },
      { e: "🉐", n: "Japanese “bargain” button" },
      { e: "🈹", n: "Japanese “discount” button" },
      { e: "🈚", n: "Japanese “free of charge” button" },
      { e: "🈲", n: "Japanese “prohibited” button" },
      { e: "🉑", n: "Japanese “acceptable” button" },
      { e: "🈸", n: "Japanese “application” button" },
      { e: "🈴", n: "Japanese “passing grade” button" },
      { e: "🈳", n: "Japanese “vacancy” button" },
      { e: "㊗️", n: "Japanese “congratulations” button" },
      { e: "㊙️", n: "Japanese “secret” button" },
      { e: "🈺", n: "Japanese “open for business” button" },
      { e: "🈵", n: "Japanese “no vacancy” button" },
      { e: "🔴", n: "red circle" },
      { e: "🟠", n: "orange circle" },
      { e: "🟡", n: "yellow circle" },
      { e: "🟢", n: "green circle" },
      { e: "🔵", n: "blue circle" },
      { e: "🟣", n: "purple circle" },
      { e: "🟤", n: "brown circle" },
      { e: "⚫", n: "black circle" },
      { e: "⚪", n: "white circle" },
      { e: "🟥", n: "red square" },
      { e: "🟧", n: "orange square" },
      { e: "🟨", n: "yellow square" },
      { e: "🟩", n: "green square" },
      { e: "🟦", n: "blue square" },
      { e: "🟪", n: "purple square" },
      { e: "🟫", n: "brown square" },
      { e: "⬛", n: "black large square" },
      { e: "⬜", n: "white large square" },
      { e: "◼️", n: "black medium square" },
      { e: "◻️", n: "white medium square" },
      { e: "◾", n: "black medium-small square" },
      { e: "◽", n: "white medium-small square" },
      { e: "▪️", n: "black small square" },
      { e: "▫️", n: "white small square" },
      { e: "🔶", n: "large orange diamond" },
      { e: "🔷", n: "large blue diamond" },
      { e: "🔸", n: "small orange diamond" },
      { e: "🔹", n: "small blue diamond" },
      { e: "🔺", n: "red triangle pointed up" },
      { e: "🔻", n: "red triangle pointed down" },
      { e: "💠", n: "diamond with a dot" },
      { e: "🔘", n: "radio button" },
      { e: "🔳", n: "white square button" },
      { e: "🔲", n: "black square button" },
      { e: "🏁", n: "chequered flag" },
      { e: "🚩", n: "triangular flag" },
      { e: "🎌", n: "crossed flags" },
      { e: "🏴", n: "black flag" },
      { e: "🏳️", n: "white flag" },
      { e: "🏳️‍🌈", n: "rainbow flag" },
      { e: "🏳️‍⚧️", n: "transgender flag" },
      { e: "🏴‍☠️", n: "pirate flag" },
      { e: "🔱", n: "trident emblem" },
      { e: "📛", n: "name badge" },
      { e: "🔰", n: "Japanese symbol for beginner" },
      { e: "⭕", n: "hollow red circle" },
      { e: "✅", n: "check mark button" },
      { e: "☑️", n: "check box with check" },
      { e: "✔️", n: "check mark" },
      { e: "❌", n: "cross mark" },
      { e: "❎", n: "cross mark button" },
      { e: "➕", n: "plus" },
      { e: "➖", n: "minus" },
      { e: "➗", n: "divide" },
      { e: "✖️", n: "multiply" },
      { e: "🟰", n: "heavy equals sign" },
      { e: "➰", n: "curly loop" },
      { e: "➿", n: "double curly loop" },
      { e: "〽️", n: "part alternation mark" },
      { e: "✳️", n: "eight-spoked asterisk" },
      { e: "✴️", n: "eight-pointed star" },
      { e: "❇️", n: "sparkle" },
      { e: "©️", n: "copyright" },
      { e: "®️", n: "registered" },
      { e: "™️", n: "trade mark" },
      { e: "#️⃣", n: "keycap: #" },
      { e: "*️⃣", n: "keycap: *" },
      // 0-9 keycaps can be added similarly if needed
      { e: "🔠", n: "input latin uppercase" },
      { e: "🔡", n: "input latin lowercase" },
      { e: "🔢", n: "input numbers" },
      { e: "🔣", n: "input symbols" },
      { e: "🔤", n: "input latin letters" },
      { e: "🅰️", n: "A button (blood type)" },
      { e: "🆎", n: "AB button (blood type)" },
      { e: "🅱️", n: "B button (blood type)" },
      { e: "🅾️", n: "O button (blood type)" },
      { e: "🆑", n: "CL button" },
      { e: "🆒", n: "COOL button" },
      { e: "🆓", n: "FREE button" },
      { e: "ℹ️", n: "information" },
      { e: "🆔", n: "ID button" },
      { e: "Ⓜ️", n: "circled M" },
      { e: "🆕", n: "NEW button" },
      { e: "🆖", n: "NG button" },
      { e: "🅿️", n: "P button" },
      { e: "🆘", n: "SOS button" },
      { e: "🆙", n: "UP! button" },
      { e: "🆚", n: "VS button" },
      { e: "🈁", n: "Japanese “here” button" },
      { e: "🈯", n: "Japanese “reserved” button" },
      { e: "🈳", n: "Japanese “vacancy” button" },
      { e: "🈵", n: "Japanese “no vacancy” button" },
      { e: "🈴", n: "Japanese “passing grade” button" },
      { e: "🈲", n: "Japanese “prohibited” button" },
      { e: "🉐", n: "Japanese “bargain” button" },
      { e: "🉑", n: "Japanese “acceptable” button" },
      { e: "🈹", n: "Japanese “discount” button" },
      { e: "🈺", n: "Japanese “open for business” button" },
      { e: "🈶", n: "Japanese “not free of charge” button" },
      { e: "🈚", n: "Japanese “free of charge” button" },
      { e: "🈷️", n: "Japanese “monthly amount” button" },
      { e: "🈸", n: "Japanese “application” button" },
      { e: "✖️", n: "multiply" },
      { e: "➕", n: "plus" },
      { e: "➖", n: "minus" },
      { e: "➗", n: "divide" },
      { e: "♾️", n: "infinity" },
      { e: "‼️", n: "double exclamation mark" },
      { e: "⁉️", n: "exclamation question mark" },
      { e: "❓", n: "question mark" },
      { e: "❔", n: "white question mark" },
      { e: "❕", n: "white exclamation mark" },
      { e: "❗", n: "exclamation mark" },
      { e: "〰️", n: "wavy dash" },
      { e: "💱", n: "currency exchange" },
      { e: "💲", n: "heavy dollar sign" },
      { e: "⚕️", n: "medical symbol" },
      { e: "♻️", n: "recycling symbol" },
      { e: "⚜️", n: "fleur-de-lis" },
      { e: "🔱", n: "trident emblem" },
      { e: "📛", n: "name badge" },
      { e: "🔰", n: "Japanese symbol for beginner" },
      { e: "⭕", n: "hollow red circle" },
      { e: "✅", n: "white heavy check mark" },
      { e: "☑️", n: "ballot box with check" },
      { e: "✔️", n: "heavy check mark" },
    ],
  },
  // You can add a new "flags" category if you want all country flags
];

const EMOJI_CATEGORY_OVERRIDES: Record<string, string> = {
  "🛹": "activity",
  "🎪": "activity",
  "🎭": "activity",
  "🛠️": "objects",
  "🪝": "objects",
  "🪣": "objects",
  "⌛": "objects",
  "⌚": "objects",
  "⏱️": "objects",
  "⏲️": "objects",
  "🕰️": "objects",
};

const OBJECT_NAME_PATTERN =
  /camera|video|film|magnifying|candle|light bulb|flashlight|lantern|diya|book|notebook|ledger|page|newspaper|bookmark|label|money|coin|banknote|credit card|receipt|envelope|mail|tray|package|postbox|ballot/;

const TRAVEL_OBJECT_NAME_PATTERN =
  /hammer|wrench|hook|bucket|hourglass|watch|clock|stopwatch|timer/;

function getPreferredCategoryId(entry: EmojiEntry, sourceCategoryId: string) {
  const override = EMOJI_CATEGORY_OVERRIDES[entry.e];
  if (override) return override;

  const name = entry.n.toLowerCase();
  if (sourceCategoryId === "activity" && OBJECT_NAME_PATTERN.test(name)) {
    return "objects";
  }
  if (sourceCategoryId === "travel" && TRAVEL_OBJECT_NAME_PATTERN.test(name)) {
    return "objects";
  }

  return sourceCategoryId;
}

const NORMALIZED_CATEGORIES: Category[] = (() => {
  const buckets = new Map(
    CATEGORIES.map((category) => [category.id, [] as EmojiEntry[]]),
  );
  const seen = new Set<string>();

  for (const category of CATEGORIES) {
    for (const entry of category.emojis) {
      if (seen.has(entry.e)) continue;

      const preferredCategoryId = getPreferredCategoryId(entry, category.id);
      const bucket = buckets.get(preferredCategoryId);
      if (!bucket) continue;

      bucket.push(entry);
      seen.add(entry.e);
    }
  }

  return CATEGORIES.map((category) => ({
    ...category,
    emojis: buckets.get(category.id) ?? [],
  }));
})();

const MAX_RECENT = 24;
const RECENT_KEY = "emoji-picker-recent";

function loadRecent(): EmojiEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(emoji: EmojiEntry, prev: EmojiEntry[]): EmojiEntry[] {
  const next = [emoji, ...prev.filter((e) => e.e !== emoji.e)].slice(
    0,
    MAX_RECENT,
  );
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EmojiGrid({
  emojis,
  onSelect,
}: {
  emojis: EmojiEntry[];
  onSelect: (entry: EmojiEntry) => void;
}) {
  return (
    <TooltipProvider delayDuration={600}>
      <div className="grid grid-cols-8 gap-0.5 p-1">
        {emojis.map((entry, index) => (
          <Tooltip key={`${entry.e}-${entry.n}-${index}`}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-lg leading-none transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {entry.e}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="px-2 py-1 text-[11px] capitalize"
            >
              {entry.n}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

// ─── Panel (standalone) ───────────────────────────────────────────────────────

interface EmojiPickerPanelProps {
  onEmojiSelect?: (emoji: string) => void;
  /** Extra callback fired after selection — used by the popover to close itself. */
  onAfterSelect?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function EmojiPickerPanel({
  onEmojiSelect,
  onAfterSelect,
  autoFocus = false,
  className,
}: EmojiPickerPanelProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("smileys");
  const [recent, setRecent] = useState<EmojiEntry[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    if (autoFocus) setTimeout(() => searchRef.current?.focus(), 50);
  }, [autoFocus]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return NORMALIZED_CATEGORIES.flatMap((c) => c.emojis).filter((e) =>
      e.n.includes(q),
    );
  }, [query]);

  const handleSelect = (entry: EmojiEntry) => {
    onEmojiSelect?.(entry.e);
    setRecent((prev) => saveRecent(entry, prev));
    onAfterSelect?.();
  };

  const currentCategory = NORMALIZED_CATEGORIES.find(
    (c) => c.id === activeCategory,
  )!;

  return (
    <div className={cn("flex w-88 flex-col overflow-hidden", className)}>
      {/* Search */}
      <div className="border-b border-border/60 px-3 py-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emoji…"
            className="h-8 border-0 bg-muted/50 pl-8 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
      </div>

      {searchResults ? (
        <ScrollArea className="h-65">
          {searchResults.length === 0 ? (
            <div className="flex h-65 flex-col items-center justify-center gap-2 text-muted-foreground">
              <span className="text-3xl">🔍</span>
              <p className="text-xs">No results for "{query}"</p>
            </div>
          ) : (
            <div className="p-2">
              <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Results
              </p>
              <EmojiGrid emojis={searchResults} onSelect={handleSelect} />
            </div>
          )}
        </ScrollArea>
      ) : (
        <>
          <ScrollArea className="h-65">
            <div className="p-2">
              {recent.length > 0 && (
                <section className="mb-3">
                  <p className="mb-1 flex items-center gap-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    <Clock className="h-3 w-3" />
                    Recently used
                  </p>
                  <EmojiGrid emojis={recent} onSelect={handleSelect} />
                </section>
              )}
              <section>
                <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  {currentCategory.label}
                </p>
                <EmojiGrid
                  emojis={currentCategory.emojis}
                  onSelect={handleSelect}
                />
              </section>
            </div>
          </ScrollArea>

          <div className="border-t border-border/60">
            <div className="flex items-center justify-between px-2 py-1.5">
              {NORMALIZED_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    title={cat.label}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                      activeCategory === cat.id
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Popover wrapper ──────────────────────────────────────────────────────────

interface EmojiPickerProps {
  onEmojiSelect?: (emoji: string) => void;
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}

export default function EmojiPicker({
  onEmojiSelect,
  trigger,
  align = "start",
  side = "top",
}: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Open emoji picker"
          >
            <Smile className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        className="w-auto p-0 shadow-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <EmojiPickerPanel
          onEmojiSelect={onEmojiSelect}
          onAfterSelect={() => setOpen(false)}
          autoFocus={open}
        />
      </PopoverContent>
    </Popover>
  );
}

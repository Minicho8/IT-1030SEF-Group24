function moodING(choice) {
    switch(choice) {
        case "ease_anxious":
            this.status = "ease_anxious";
            this.ingredients = ["turmeric","egg","yogurt","green tea",
                "almond","dark chocolate","tuna","sweet potato","avocado",
                "orange","edamame","walnut","banana","nutritional yeast",
                "mushroom","lentil","chia seed","garlic","apple","Kefir",
                "matcha powder","cantaloupe","date","oyster","lamb",
                "roasted seaweed","cherry","kumquat","bell pepper",
                "pumpkin seed","white tea","oolong tea","onion","asparagus",
                "apple","quinoa","chicken","duck","goose","turkey","beef",
                "pork","mackerel","Sardine","salmon","sardine","trout",
                "whitebait","anchovy","cloudberry","boysenberry",
                "huckleberry","mulberry","blueberry","strawberry","raspberry",
                "blackberry","cranberry","gooseberry","black currant",
                "red currant","white currant","cauliflower","brussels sprouts",
                "kidney bean","black bean","pinto bean","navy bean",
                "black-eyed pea","soybeans","cranberry bean","romaine lettuce",
                "lettuce","iceberg lettuce","spinach","kale","swiss chard",
                "arugula","watercress","endive","bok choy","broccoli","amaranth",
                "water spinach","cabbage"];
            break;
        case "ease_depressed":
            this.status = "ease_depressed";
            this.ingredients = ["turmeric","egg","yogurt","green tea","beet greens",
                "dark chocolate","turnip","mustard","whole wheat bread","pumelo",
                "oyster","pumpkin","Cauliflower","red cabbage","turkey","brazil nut",
                "carrot","milk","cheese","bulgur","millet","quinoa","brown rice","pea",
                "oat","flaxseed","Rapeseed","clam","mussels","octopus","crab",
                "goat","pollock","lobster","trout","snapper","kohlrabi","brussels sprout",
                "acerola cherry","butternut squash","papaya","lemon","mackerel","salmon",
                "sardine","whitebait","anchovy","tuna","cloudberry","boysenberry",
                "huckleberry","mulberry","blueberry","strawberry","raspberry","blackberry",
                "cranberry","gooseberry","black currant","red currant","white currant",
                "lettuce","red lettuce","cilantro","basil","parsley","bell pepper",
                "serrano pepper","jalapeno pepper","almond","cashew","walnut","kidney bean",
                "black bean","pinto bean","navy bean","black-eyed pea","soybeans",
                "cranberry bean","dandelion greens","chicory","romaine lettuce","lettuce",
                "iceberg lettuce","spinach","kale","swiss chard","arugula","watercress",
                "endive","bok choy","broccoli","water spinach","cabbage","Amaranth"];
            break;
        case "relax":
            this.status = "relax";
            this.ingredients = ["broccoli","almond","oat","turkey","sweet potato",
                "grapefruit","lentil","apple","turmeric","banana","matcha powder","avocado",
                "orange","lemon","lime","kiwi","pomegranate","cashew","pumpkin seed",
                "dark chocolate","fig","green tea","spinach","walnut","turmeric","cherry",
                "edamame","kale","milk","yogurt","mackerel","sardine","salmon","sardine",
                "trout","anchovy","tuna","cloudberry","boysenberry","huckleberry","mulberry",
                "blueberry","strawberry","raspberry","blackberry","cranberry","gooseberry",
                "black currant","red currant","white currant","kidney bean","black bean",
                "pinto bean","navy bean","black-eyed pea","soybeans","cranberry bean",
                "romaine lettuce","iceberg lettuce","swiss chard","arugula","watercress",
                "endive","bok choy","amaranth","water spinach","cabbage"];
            break;
        case "ease_angry":
            this.status = "ease_angry";
            this.ingredients = ["banana","dark chocolate","walnut","herbal tea","chicken",
                "pistachio","celery","salmon","mackerel","sardine","flaxseed","spinach",
                "kale","almond","oat","brown rice","whole wheat bread","pea","yogurt",
                "kefir","lavender","tulsi","cloudberry","boysenberry","huckleberry","mulberry",
                "blueberry","strawberry","raspberry","blackberry","cranberry","gooseberry",
                "black currant","red currant","white currant"];
            break;
        case "energy_recover":
            this.status = "energy_recover";
            this.ingredients = ["avocado","banana","salmon","hummus","coconut water","milk",
                "honey","greek yogurt","chicken breast","lentil","oat","whole wheat bread",
                "cloudberry","boysenberry","huckleberry","mulberry","blueberry","strawberry",
                "raspberry","blackberry","cranberry","gooseberry","black currant","red currant",
                "white currant","almond","cashew","walnut"];
            break;
        case "focus":
            this.status = "focus";
            this.ingredients = ["green tea","instant coffee","matcha powder","salmon","mackerel",
                "sardine","avocado","blueberry","pumpkin seed","chia seed","flaxseed","broccoli",
                "kale","brussels sprout","dark chocolate","egg","walnut"];
            break;
        }
}
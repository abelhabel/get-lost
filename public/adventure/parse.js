function handleFiles(files)
{
    var read=new FileReader();
    read.readAsBinaryString(files[0]);
    read.onloadend=function()
    {
        saveTextFile(document.getElementsByClassName("headerRow adventureEntry")[0].linkedObject.name, read.result,files[0].name);
    }
    
}
function getTextAsIs(div)
{
    if(document.body.innerText) 
    {
        var message = div.innerText;
    }else
    {
        var message = div.textContent; //div.innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "").replace(/<br>/g,"");
    }
    console.log(message);
    return message;
}
function getTextInputs(increment)
{
    var ao = go.currentAdventure;
        ao.textInputsIndex += increment;
        if(ao.textInputsIndex < 1)
        {
            ao.textInputsIndex = 1;
        }
        if(ao.textInputsIndex >= ao.textInputs.length)
        {
            ao.textInputsIndex = ao.textInputs.length;
        }
        
        return ao.textInputs[ao.textInputs.length - ao.textInputsIndex];
}
go.adventureInput.onkeyup = function(e)
{
    var enter = 13;
    var up = 38;
    var down = 40;
    var left = 37;
    var right = 39;
    if(e.keyCode == enter)
    {
        parseText(getTextAsIs(go.adventureInput).trim());
        go.adventureInput.innerHTML = "";
    }
    if(e.keyCode == up)
    {
        go.adventureInput.innerHTML = getTextInputs(1);
    }
    if(e.keyCode == down)
    {
        go.adventureInput.innerHTML = getTextInputs(-1);
    }
}

function parseText(text)
{
    var adventure = go.currentAdventure;
    var scenes = go.currentAdventure.scenes;
    //verbs: take, eat, drink, look, use, bash, lock, unlock, close, open, sit, stand, go
    //preposition: on, inside, at, through
    var verbs = ["exit","take", "eat", "drink", "look", "bash", "lock", "unlock", "close", "open", "sit", "go", "search"];
    var prepositions = ["at", "inside", "in", "through", "with"];
    
    console.log("text" + text);
    adventure.textInputsIndex = 0;
    adventure.textInputs.push(text);
    var feedback = "";
    text = text.toLowerCase();
    var words = text.split(' ');
    var prePrepositionWords = getPrePrepositionWords(words);
    prePrepositionWords = getTripleWords(prePrepositionWords).concat(getDoubleWords(prePrepositionWords), prePrepositionWords);
    var postPrepositionWords = getPostPrepositionWords(words);
    postPrepositionWords = getTripleWords(postPrepositionWords).concat(getDoubleWords(postPrepositionWords), postPrepositionWords);
    var doubleWords = getDoubleWords(words);
    var tripleWords = getTripleWords(words);
    words = tripleWords.concat(doubleWords, words);
    words = removeDuplicateWords();
    getScene(player.currentScene).visited = true;
    var sceneItems = player.currentScene.objects;
    var containedSceneItems = getContainedSceneItems();
    var containedInventoryItems = getContainedItems(player.inventory);
    console.log("contained scene items", containedSceneItems, "contained inventory items", containedInventoryItems);
    // ITEMS
    var item = getItem(words);
    var containerItem = getContainerItem(words)[1];
    var parentItem = getContainerItem(words)[0];
    // set the last item interacted with
    if(checkAnyWord('it', words))
    {
        item = adventure.lastItem;
    }else
    if(item)
    {
        adventure.lastItem = item;
    }else
    if(containerItem)
    {
        adventure.lastItem = containerItem;
    }
    function getContainedItems(itemList)
    {
        var temp = [];
        for(var j = 0; j < itemList.length; j += 1)
        {
            for(var k = 0; k < itemList[j].contains.length; k += 1)
            {
                if(itemList[j].hidden == "false" && itemList[j].contains[k].hidden == "false")
                {
                    temp.push({item:itemList[j].contains[k], parentItem:itemList[j]});
                }
            }
        }
        return temp;
    }
    function getContainedSceneItems()
    {
        var temp = [];
        for(var i = 0; i < sceneItems.length; i += 1)
        {
            for(var j = 0; j < sceneItems[i].contains.length; j += 1)
            {
                if(sceneItems[i].hidden == "false" && sceneItems[i].contains[j].hidden == "false")
                {
                    temp.push({item:sceneItems[i].contains[j], parentItem:sceneItems[i]});
                }
            }
        }
        return temp;
    }
    function removeDuplicateWords()
    {
        for(var i = 0; i < words.length; i += 1)
        {
            for(var j = 0; j < words.length; j += 1)
            {
                if(words[i] == words[j] && i != j)
                {
                    words.splice(j,1);
                }
            }
        }
        return words;
    }
    function getItemsByName(itemList, wordList)
    {
        var temp = [];
        for(var i = 0; i < wordList.length; i += 1)
        {
            for(var j = 0; j < itemList.length; j += 1)
            {
                if(wordList[i] == itemList[j].name.toLowerCase())
                {
                    if(itemList[j].hidden == "false")
                    {
                        temp.push(itemList[j]);
                    }
                }
            }
        }
        return temp;
    }
    function getContainedItemsByName(itemList, wordList)
    {
        var temp = [];
        for(var i = 0; i < wordList.length; i += 1)
        {
            for(var j = 0; j < itemList.length; j += 1)
            {
                if(wordList[i] == itemList[j].item.name.toLowerCase())
                {
                    if(itemList[j].item.hidden == "false")
                    {
                        temp.push(itemList[j]);
                    }
                }
            }
        }
        return temp;
    }
    function getContainedItemsByUnderstandAs(itemList, wordList)
    {
        var temp = [];
        for(var i = 0; i < wordList.length; i += 1)
        {
            for(var j = 0; j < itemList.length; j += 1)
            {
                if(wordList[i] == itemList[j].item.understandAs.toLowerCase())
                {
                    if(itemList[j].item.hidden == "false")
                    {
                        temp.push(itemList[j]);
                    }
                }
            }
        }
        return temp;
    }
    function getItemsByUnderstandAs(itemList, wordList)
    {
        var temp = [];
        for(var i = 0; i < wordList.length; i += 1)
        {
            for(var j = 0; j < itemList.length; j += 1)
            {
                if(wordList[i] == itemList[j].understandAs.toLowerCase())
                {
                    if(itemList[j].hidden == "false")
                    {
                        temp.push(itemList[j]);
                    }

                }
            }
        }
        return temp;
    }
    function getDoubleWords(list)
    {
        var temp = [];
        for(var i = 0; i < list.length - 1; i += 1)
        {
            temp.push(list[i] + " " + list[i+1]);
        }
        return temp;
    }
    function getTripleWords(list)
    {
        var temp = [];
        for(var i = 0; i < list.length - 2; i += 1)
        {
            temp.push(list[i] + " " + list[i+1] + " " + list[i+2]);
        }
        return temp;
    }
    function getPrePrepositionWords(list)
    {
        var temp = [];
        for(var i = 0; i < list.length; i += 1)
        {
            for(var j = 0; j < prepositions.length; j += 1)
            {
                
                if(list[i] == [prepositions[j]])
                {
                    return temp;
                }
            }
            temp.push(list[i]);
        }
        return temp;
    }
    function getPostPrepositionWords(list)
    {
        var temp = [];
        var prepositionEncounterd = false;
        for(var i = 0; i < list.length; i += 1)
        {
            if(prepositionEncounterd)
            {
                temp.push(list[i]);
            }
            for(var j = 0; j < prepositions.length; j += 1)
            {
                
                if(list[i] == [prepositions[j]])
                {
                    prepositionEncounterd = true;
                }
            }
            
        }
        return temp;
    }
    //sceneItems will in the playing version of the game be taken from somewhere else as the editor features will not
    //be present in the playing version
    function getScene(sceneName)
    {
        for(var i = 0; i < scenes.length; i += 1)
        {
            if(scenes[i].name == sceneName)
            {
                return scenes[i];
            }
        }
        return false;
    }
    function getSceneObject(objectName)
    {
        var items = getScene(player.currentScene).objects;
        for(var i = 0; i < items.length; i += 1)
        {
            if(items[i].name == objectName)
            {
                return items[i];
            }
        }
        return false;
    }
    function setSceneKey(key,value)
    {
        getScene(player.currentScene)[key] = value;
    }
    
    function getItemNames(list)
    {
        var temp = [];
        for(var i = 0; i < list.length; i += 1)
        {
            temp.push(list[i].name);
        }
        return temp;
    }
    function searchRoom()
    {
        var d10 = Math.ceil(Math.random() * 10);
        var temp = "";
        for(var i = 0; i < sceneItems.length; i += 1)
        {
            if(sceneItems[i].hidden == "true" && parseInt(sceneItems[i].searchRating) < d10)
            {
                sceneItems[i].hidden = "false";
                temp += getAAn(sceneItems[i].name) + " " + sceneItems[i].name + ", ";
            }else
            {
                sceneItems[i].searchRating = parseInt(sceneItems[i].searchRating) + 1;
            }
        }
        return temp;
    }
    function getItemByName(name)
    {
        for(var i = 0; i < sceneItems.length; i += 1)
        {
            if(name == sceneItems[i].name)
            {
                return sceneItems[i];
            }
        }
        return false;
    }
    
    function getItem(list)
    {
        var items = sceneItems.concat(player.inventory);
        for(var i = 0; i < list.length; i += 1)
        {
            for(var j = 0; j < items.length; j += 1)
            {
                if(items[j].hidden == "false")
                {
                    if(list[i] == items[j].name.toLowerCase() || list[i] == items[j].understandAs.toLowerCase())
                    {
                        return items[j];
                    }
                }
            }
        }
        return false;
    }
    function getItemByKey(key, value, list)
    {
        for(var i = 0; i < list.length; i += 1)
        {
            if(value == list[i][key])
            {
                return list[i];
            }
        }
        return false;
    }
    function getItemDuplicates(list)
    {
        // 1. find all scene items matching the input string based on understandAs
        // 2. find all container items that are in an open container and add them to found items
        // 3. check if any of these items understandAs are the same
        var items = sceneItems.concat(player.inventory);
        var temp = [];
        for(var i = 0; i < list.length; i += 1)
        {
            for(var j = 0; j < items.length; j += 1)
            {
                if(list[i] == items[j].name.toLowerCase())
                {
                    temp.push(items[j]);
                }
                for(var k = 0; k < items[j].contains.length; k += 1)
                {
                    if(list[i] == items[j].contains[k].name.toLowerCase())
                    {
                        temp.push(items[j].contains[k]);
                    }
                }
            }
        }
        console.log("items by name", temp);
        var foundItems = [];
        for(var i = 0; i < list.length; i += 1)
        {
            for(var j = 0; j < items.length; j += 1)
            {
                if(list[i] == items[j].understandAs.toLowerCase() && items[j].hidden == "false" && !checkAnyWord(items[j], temp) && !getItemByKey('understandAs', items[j].understandAs, temp))
                {
                    foundItems.push(items[j]);
                }
            }
        }
        
        for(var i = 0; i < items.length; i += 1)
        {
            for(var j = 0; j < items[i].contains.length; j += 1)
            {
                if(checkAnyWord(items[i].contains[j].understandAs.toLowerCase(), words) && items[i].contains[j].hidden == "false" && items[i].open == "true" && !checkAnyWord(items[i].contains[j], temp) && !getItemByKey('understandAs', items[i].contains[j].understandAs, temp))
                {
                    foundItems.push(items[i].contains[j]);
                }
            }
            
        }
        return foundItems;
    }
    function getSceneItem(list)
    {
        var items = sceneItems;
        for(var i = 0; i < list.length; i += 1)
        {
            for(var j = 0; j < items.length; j += 1)
            {
                if(list[i] == items[j].name.toLowerCase() || list[i] == items[j].understandAs.toLowerCase())
                {
                    return items[j];
                }
            }
        }
        return false;
    }
    function getContainerItem(list)
    {
        var items = sceneItems.concat(player.inventory);
        for(var i = 0; i < items.length; i += 1)
        {
            for(var j = 0; j < items[i].contains.length; j += 1)
            {
                if(checkAnyWord(items[i].contains[j].name.toLowerCase(), list))
                {
                    return [items[i], items[i].contains[j]];
                }
            }
            
        }
        return false;
    }
    function getNoun(extraWord)
    {
        var excludeWords = verbs.concat(prepositions);
        excludeWords.push(extraWord);
        excludeWords.push('the');
        var list = text.split(' ');
        for(var j = 0; j < list.length; j += 1)
        {

            if(!checkAnyWord(list[j], excludeWords))
            {
                return list[j];
            }
        }
        return false;
    }
    function checkAnyWord(word, list)
    {
        for(var j = 0; j < list.length; j += 1)
        {
            if(word == list[j])
            {
                return true;
            }
        }
        return false;
    }
    function checkInventory(item)
    {
        for(var i = 0; i < player.inventory.length; i += 1)
        {
            if(item == player.inventory[i])
            {
                return true;
            }
        }
        return false;
    }
    
    function printItems(list)
    {
        var temp = "";
        for(var k = 0; k < list.length; k += 1)
        {
            if(list[k].hidden == "false")
            {
                temp += getAAn(list[k].name) + " " + list[k].name + checkLeadsToText(list[k]);
                temp += ", ";
                
            }
        }
        return temp;
    }
    function printContainerItems(item)
    {
        var temp = "";
        var list = item.contains;
        for(var k = 0; k < list.length; k += 1)
        {
            if(list[k].hidden == "false")
            {
                temp += getAAn(list[k].name) + " " + list[k].name + ", ";
            }
        }
        return temp;
    }
    function printList(list)
    {
        var temp = "";
        for(var k = 0; k < list.length; k += 1)
        {
            temp += list[k];
            temp += ", ";
        }
        return temp;
    }
    function getAAn(word)
    {
        var vowels = ["a", "e", "i", "o", "u",];
        if(checkAnyWord(word.toLowerCase().charAt(0), vowels))
        {
            return "an";
        }else
        {
            return "a";
        }
    }
    function checkLeadsToText(item)
    {
        if(item.leadsTo != "")
        {
            if(getScene(item.leadsTo).visited)
            {
                return " (Leads to the " + item.leadsTo +") ";
            }
        }
        return "";
    }
    function removeItemFromArray(item, arr)
    {
        for(var i = 0; i < arr.length; i += 1)
        {
            if(item == arr[i])
            {
                arr.splice(i,1);
                return true;
            }
        }
        return false;
    }
    
    function getContainerSpace(container)
    {
        var space = container.size;
        for(var i = 0; i < container.contains.length; i += 1)
        {
            space -= container.contains[i].size;
        }
        return space;
    }
    
    
    // SET SCENE
    if(checkAnyWord('setscene', words))
    {
        setSceneKey('visited', false);
    }
    // HELP
    if(checkAnyWord('help', words))
    {
        feedback += "To describe your action, use these words: " + printList(verbs);
        feedback += "<br>Prepositions you can use are: " + printList(prepositions);
        console.log('help' + feedback);
    }
    // ITEM DUPLICATES
    // var duplicate = getItemDuplicates(words);
    // if(duplicate)
    // {
    //     $('feedback').innerHTML = "Which " + duplicate.understandAs + " do you mean?";
    //     return;
    // }
    // TAKE
    
    // EXIT
    if(checkAnyWord('exit', words)) {
        quitAdventure();
        return;
    }

    if(checkAnyWord('take', words))
    {
        //check scene items and container items by name
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems, words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems.concat(containedInventoryItems), words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems.concat(containedInventoryItems), words);
        console.log(containedSceneItems.concat(containedInventoryItems));
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one item to take.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.size < 5)
            {
                
                if(!checkInventory(item))
                {
                    feedback = "You pick up the " + item.name;
                   player.inventory.push(item);
                   removeItemFromArray(item, getScene(player.currentScene).objects); 
                }else
                {
                    feedback += "You already carry the " + item.name;
                }
                
            }else
            {
                feedback = "The " + item.name + " is too heavy for you to lift";
            }
        }else
        if(containedItemsByName.length > 1)
        {
            feedback += "Please specify only one item to take."; 
        }else
        if(containedItemsByName.length == 1)
        {
            parentItem = containedItemsByName[0]['parentItem'];
            containerItem = containedItemsByName[0]['item'];
            console.log("take container item", containedItemsByName, parentItem, containerItem);
            if(parentItem.open == "true")
            {
                
                if(!checkInventory(containerItem))
                {
                    feedback += "You pick up the " + containerItem.name;
                    player.inventory.push(containerItem);
                    removeItemFromArray(containerItem, parentItem.contains);
                }else
                {
                    feedback+= "You already carry the " + containerItem.name;
                }
                
            }else
            {
                feedback = "There is no " + getNoun();
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            feedback = "You pick up the " + item.name;
            player.inventory.push(item);
            removeItemFromArray(item, getScene(player.currentScene).objects);
        }else
        {
            feedback = "There is no " + getNoun();
        }
    }
    // PUT
    if(checkAnyWord('put', words))
    {
        //check scene items and container items by name
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), prePrepositionWords);
        var containersByName = getItemsByName(sceneItems.concat(player.inventory), postPrepositionWords);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems, prePrepositionWords);
        var containersByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), postPrepositionWords);
        var containedItemsByName = getContainedItemsByName(containedSceneItems.concat(containedInventoryItems), prePrepositionWords);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems.concat(containedInventoryItems), prePrepositionWords);
        
        console.log(containedSceneItems.concat(containedInventoryItems));
        console.log("items by name", itemsByName);
        console.log("containers by name", containersByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("containers by understand as", containersByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one item to put.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(checkAnyWord('inside', words) || checkAnyWord('in', words))
            {
                if(containersByName.length > 1)
                {
                    feedback += "Please specify only one container to put things in.";
                }else
                if(containersByName.length == 1)
                {
                    containerItem = containersByName[0];
                    if(containerItem.open == "false")
                    {
                        feedback += "The " + containerItem.name + " is not open";
                    }else
                    {
                        if(item.size < getContainerSpace(containerItem))
                        {
                            feedback += "You put the " + item.name + " inside the " + containerItem.name;
                            containerItem.contains.push(item);
                            if(!removeItemFromArray(item, sceneItems))
                            {
                                removeItemFromArray(item, player.inventory);
                            }
                        }else
                        {
                            feedback += "The " + item.name + " is too big to put inside " + containerItem.name;
                        }
                    }
                }else
                if(containersByUnderstandAs.length > 1)
                {
                    feedback += "Please specify only one container to put things in.";
                }else
                if(containersByUnderstandAs.length == 1)
                {
                    containerItem = containersByUnderstandAs[0];
                    if(containerItem.open == "false")
                    {
                        feedback += "The " + containerItem.name + " is not open";
                    }else
                    {
                        if(item.size < getContainerSpace(containerItem))
                        {
                            feedback += "You put the " + item.name + " inside the " + containerItem.name;
                            containerItem.contains.push(item);
                            if(!removeItemFromArray(item, sceneItems))
                            {
                                removeItemFromArray(item, player.inventory);
                            }
                        }else
                        {
                            feedback += "The " + item.name + " is too big to put inside " + containerItem.name;
                        }
                    }
                }
            }else
            {
                feedback += "Where do you want to put the " + item.name + "?";
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Please specify only one item to put.";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(checkAnyWord('inside', words) || checkAnyWord('in', words))
            {
                if(containersByName.length > 1)
                {
                    feedback += "Please specify only one container to put things in.";
                }else
                if(containersByName.length == 1)
                {
                    containerItem = containersByName[0];
                    if(containerItem.open == "false")
                    {
                        feedback += "The " + containerItem.name + " is not open";
                    }else
                    {
                        if(item.size < getContainerSpace(containerItem))
                        {
                            feedback += "You put the " + item.name + " inside the " + containerItem.name;
                            containerItem.contains.push(item);
                            if(!removeItemFromArray(item, sceneItems))
                            {
                                removeItemFromArray(item, player.inventory);
                            }
                        }else
                        {
                            feedback += "The " + item.name + " is too big to put inside " + containerItem.name;
                        }
                    }
                }else
                if(containersByUnderstandAs.length > 1)
                {
                    feedback += "Please specify only one container to put things in.";
                }else
                if(containersByUnderstandAs.length == 1)
                {
                    containerItem = containersByUnderstandAs[0];
                    if(containerItem.open == "false")
                    {
                        feedback += "The " + containerItem.name + " is not open";
                    }else
                    {
                        if(item.size < getContainerSpace(containerItem))
                        {
                            feedback += "You put the " + item.name + " inside the " + containerItem.name;
                            containerItem.contains.push(item);
                            if(!removeItemFromArray(item, sceneItems))
                            {
                                removeItemFromArray(item, player.inventory);
                            }
                        }else
                        {
                            feedback += "The " + item.name + " is too big to put inside " + containerItem.name;
                        }
                    }
                }
            }else
            {
                feedback += "Where do you want to put the " + item.name + "?";
            }
        }else
        {
            feedback += "The item you refer to does not seem to be available.";
        }
    }
    // LOOK
    if(checkAnyWord('look', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(checkAnyWord('at', words))
        {
            if(itemsByName.length > 1)
            {
                feedback += "Please specify only one thing to look at.";
            }else
            if(itemsByName.length == 1)
            {
                item = itemsByName[0];
                if(item.broken == "false")
                {
                    feedback += item.name + ": " + item.lookAtDesc;
                    if(item.contains.length > 0 && item.transparent == "true")
                    {
                        feedback += "<br>" + "Inside the " + item.name + " you see " + printContainerItems(item);
                    }
                }else
                {
                    feedback += "You see a broken " + item.name;
                }
                
            }else
            if(itemsByUnderstandAs.length > 1)
            {
                feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you want to look at?";
            }else
            if(itemsByUnderstandAs.length == 1)
            {
                item = itemsByUnderstandAs[0];
                if(item.broken == "false")
                {
                    feedback += item.name + ": " + item.lookAtDesc;
                    if(item.contains.length > 0 && item.transparent == "true")
                    {
                        feedback += "<br>" + "Inside the " + item.name + " you see " + printContainerItems(item);
                    }
                }else
                {
                    feedback += "You see a broken " + item.name;
                } 
            }else
            {
                feedback += "There is no such thing to look at.";
            }
            
        }else
        if(checkAnyWord('inside', words) || checkAnyWord('in', words))
        {
            if(itemsByName.length > 1)
            {
                feedback += "Please specify only one thing to look inside.";
            }else
            if(itemsByName.length == 1)
            {
                item = itemsByName[0];
                feedback += item.lookInsideDesc + "<br>";
                if(item.broken == "true")
                {
                    feedback += "You see a broken " + item.name;
                }else
                if(item.open == "true")
                {
                    if(item.contains.length > 0)
                    {
                        feedback += item.name + ": You see " + printContainerItems(item);
                    }else
                    {
                        feedback+= "The " + item.name + " is empty.";
                    }
                }else
                {
                    feedback += item.name + ": The " + item.name + " is closed.";
                }
            }else
            if(itemsByUnderstandAs.length > 1)
            {
                feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you wish to look inside";
            }else
            if(itemsByUnderstandAs.length == 1)
            {
                item = itemsByUnderstandAs[0];
                if(item.broken == "true")
                {
                    feedback += "You see a broken " + item.name;
                }else
                if(item.open == "true")
                {
                    if(item.contains.length > 0)
                    {
                        feedback += item.name + ": You see " + printContainerItems(item);
                    }else
                    {
                        feedback+= "The " + item.name + " is empty.";
                    }
                }else
                {
                    feedback += item.name + ": The " + item.name + " is closed.";
                }
            }
        }else
        {
            feedback += ": Looking around the room you see " + printItems(sceneItems);
            //this prints the items that are contained within a transparent container, such as a glass box
            for(var i = 0; i < sceneItems.length; i += 1)
            {
                if(sceneItems[i].transparent == "true" && sceneItems[i].contains.length > 0)
                {
                    feedback += "<br>" + "Inside the " + sceneItems[i].name + " you see " + printContainerItems(sceneItems[i]);
                }
            }
        }
    }
    // OPEN
    if(checkAnyWord('open', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing to open.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.openable == "false")
            {
                feedback += "The " + item.name + " cannot be opened.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " is already open."
            }else
            if(item.locked == "true")
            {
                feedback += "The " + item.name + " is locked.";
            }else
            {
                feedback += "You open the " + item.name;
                item.open = "true";
                if(item.soundOnOpen != "undefined")
                {
                    playSound(item.soundOnOpen);
                }
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you want to open?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.openable == "false")
            {
                feedback += "The " + item.name + " cannot be opened.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " is already open."
            }else
            if(item.locked == "true")
            {
                feedback += "The " + item.name + " is locked.";
            }else
            {
                feedback += "You open the " + item.name;
                item.open = "true";
                if(item.soundOnOpen != "undefined")
                {
                    playSound(item.soundOnOpen);
                }
            }
        }else
        {
            feedback += "What is it that you want to open?";
        }
    }
    // CLOSE
    if(checkAnyWord('close', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing to open.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.openable == "true")
            {
                if(item.open == "true")
                {
                    feedback += "You close the " + item.name;
                    item.open = "false";
                    if(item.soundOnClose != "undefined")
                    {
                        playSound(item.soundOnClose);
                    }
                }else
                {
                    feedback += "The " + item.name + " is already closed";
                }
            }else
            {
                feedback += "There is nothing to close the " + item.name + " with";
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you want to close?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.openable == "true")
            {
                if(item.open == "true")
                {
                    feedback += "You close the " + item.name;
                    item.open = "false";
                    if(item.soundOnClose != "undefined")
                    {
                        playSound(item.soundOnClose);
                    }
                }else
                {
                    feedback += "The " + item.name + " is already closed";
                }
            }else
            {
                feedback += "There is nothing to close the " + item.name + " with";
            }
        }
        else
        {
            feedback += "There is no such thing to close.";
        }
    }
    // UNLOCK
    if(checkAnyWord('unlock', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), prePrepositionWords);
        var keysByName = getItemsByName(sceneItems.concat(player.inventory), postPrepositionWords);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), prePrepositionWords);
        var keysByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), postPrepositionWords);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, prePrepositionWords);
        var containedKeysByName = getContainedItemsByName(containedSceneItems, prePrepositionWords);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, prePrepositionWords);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing to unlock.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " is not locked, and is already open.";
            }else
            if(item.locked == "false")
            {
                feedback += "The " + item.name + " is not locked.";
            }else
            {
                if(checkAnyWord('with', words))
                {
                    
                    if(keysByName.length > 1)
                    {
                        feedback += "Please specify only one thing to unlock the " + item.name + " with.";
                    }else
                    if(keysByName.length == 1)
                    {
                        var key = keysByName[0];
                        console.log('key: ' + key);
                        if(item.unlocksWith.toLowerCase() == key.name.toLowerCase())
                        {
                            feedback += "You unlock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnUnlock != "undefined")
                            {
                                playSound(item.soundOnUnlock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to unlock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }else
                    if(keysByUnderstandAs.length > 1)
                    {
                        feedback += "Which " + keysByUnderstandAs[0].understandAs + " do you want to unlock the " + item.name + " with.";
                    }else
                    if(keysByUnderstandAs.length == 1)
                    {
                        var key = keysByUnderstandAs[0];
                        if(item.unlocksWith.toLowerCase() == key.name.toLowerCase())
                        {
                            feedback += "You unlock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnUnlock != "undefined")
                            {
                                playSound(item.soundOnUnlock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to unlock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }
                }
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you want to unlock?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " is not locked, and is already open.";
            }else
            if(item.locked == "false")
            {
                feedback += "The " + item.name + " is not locked.";
            }else
            {
                if(checkAnyWord('with', words))
                {
                    
                    if(keysByName.length > 1)
                    {
                        feedback += "Please specify only one thing to unlock the " + item.name + " with.";
                    }else
                    if(keysByName.length == 1)
                    {
                        var key = keysByName[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You unlock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnUnlock != "undefined")
                            {
                                playSound(item.soundOnUnlock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to unlock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }else
                    if(keysByUnderstandAs.length > 1)
                    {
                        feedback += "Which " + keysByUnderstandAs[0].understandAs + " do you want to unlock the " + item.name + " with.";
                    }else
                    if(keysByUnderstandAs.length == 1)
                    {
                        var key = keysByUnderstandAs[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You unlock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnUnlock != "undefined")
                            {
                                playSound(item.soundOnUnlock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to unlock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }
                }
            }
        }else
        {
            feedback += "There do not seem to be any items that fit your command."
        }
    }
    // LOCK
    if(checkAnyWord('lock', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), prePrepositionWords);
        var keysByName = getItemsByName(sceneItems.concat(player.inventory), postPrepositionWords);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), prePrepositionWords);
        var keysByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), postPrepositionWords);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, prePrepositionWords);
        var containedKeysByName = getContainedItemsByName(containedSceneItems, prePrepositionWords);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, prePrepositionWords);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing to lock.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " needs to be closed before it can be locked.";
            }else
            if(item.locked == "true")
            {
                feedback += "The " + item.name + " is already locked.";
            }else
            {
                if(checkAnyWord('with', words))
                {
                    
                    if(keysByName.length > 1)
                    {
                        feedback += "Please specify only one thing to lock the " + item.name + " with.";
                    }else
                    if(keysByName.length == 1)
                    {
                        var key = keysByName[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You lock the " + item.name;
                            item.locked = "true";
                            if(item.soundOnLock != "undefined")
                            {
                                playSound(item.soundOnLock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to lock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }else
                    if(keysByUnderstandAs.length > 1)
                    {
                        feedback += "Which " + keysByUnderstandAs[0].understandAs + " do you want to lock the " + item.name + " with.";
                    }else
                    if(keysByUnderstandAs.length == 1)
                    {
                        var key = keysByUnderstandAs[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You lock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnLock != "undefined")
                            {
                                playSound(item.soundOnLock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to lock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }
                }
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you want to lock?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is broken.";
            }else
            if(item.open == "true")
            {
                feedback += "The " + item.name + " needs to be closed before it can be locked.";
            }else
            if(item.locked == "true")
            {
                feedback += "The " + item.name + " is already locked.";
            }else
            {
                if(checkAnyWord('with', words))
                {
                    
                    if(keysByName.length > 1)
                    {
                        feedback += "Please specify only one thing to lock the " + item.name + " with.";
                    }else
                    if(keysByName.length == 1)
                    {
                        var key = keysByName[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You lock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnLock != "undefined")
                            {
                                playSound(item.soundOnLock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to lock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }else
                    if(keysByUnderstandAs.length > 1)
                    {
                        feedback += "Which " + keysByUnderstandAs[0].understandAs + " do you want to lock the " + item.name + " with.";
                    }else
                    if(keysByUnderstandAs.length == 1)
                    {
                        var key = keysByUnderstandAs[0];
                        if(item.unlocksWith == key.name)
                        {
                            feedback += "You lock the " + item.name;
                            item.locked = "false";
                            if(item.soundOnLock != "undefined")
                            {
                                playSound(item.soundOnLock);
                            }
                        }else
                        {
                            if(key)
                            {
                                feedback += "The " + key.name + " does not fit the key hole of the " + item.name;
                            }else
                            {
                                feedback += "The item you want to lock the " + item.name + " with, is not known to you or does not exist."
                            }
                        }
                    }
                }
            }
        }else
        {
            feedback += "There do not seem to be any items that fit your command."
        }
    }
    // EAT
    if(checkAnyWord('eat', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one item to eat.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.edible == "true")
            {
                feedback += "You eat the " + item.name;
                if(item.soundOnEat != "undefined")
                {
                    playSound(item.soundOnEat);
                }
                if(checkInventory(item))
                {
                    removeItemFromArray(item, player.inventory);
                }else
                {
                    removeItemFromArray(item, getScene(player.currentScene).objects);
                }
            }else
            {
                feedback += "The " + item.name + " is not edible."
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.edible == "true")
            {
                feedback += "You eat the " + item.name;
                if(item.soundOnEat != "undefined")
                {
                    playSound(item.soundOnEat);
                }
                removeItemFromArray(item, parentItem.contains);
            }else
            {
                feedback += "The " + item.name + " is not edible."
            }
        }else
        {
            feedback += "There is no " + getNoun('eat');
        }
    }
    // DRINK
    if(checkAnyWord('drink', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing to drink.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.drinkable == "true")
            {
                feedback += "You drink the " + item.name;
                item.name = item.onDrinkNameChange;
                item.drinkable = "false";
                if(item.soundOnDrink != "undefined")
                {
                    playSound(item.soundOnDrink);
                }
            }else
            {
                feedback += "The " + item.name + " is not drinkable."
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.drinkable == "true")
            {
                feedback += "You drink the " + item.name;
                removeItemFromArray(item, parentItem.contains);
                if(item.soundOnDrink != "undefined")
                {
                    playSound(item.soundOnDrink);
                }
            }else
            {
                feedback += "The " + item.name + " is not drinkable."
            }
        }else
        {
            feedback += "There is no " + getNoun('drink');
        }
    }
    // BASH
    if(checkAnyWord('bash', words))
    {
        var itemsByName = getItemsByName(sceneItems.concat(player.inventory), words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems.concat(player.inventory), words);
        var containedItemsByName = getContainedItemsByName(containedSceneItems, words);
        var containedItemsByUnderstandAs = getContainedItemsByUnderstandAs(containedSceneItems, words);
        console.log(containedSceneItems);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        console.log("contained items by name", containedItemsByName);
        console.log("contained items by understand as", containedItemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one item to bash.";
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is already broken.";
            }else
            if(item.breakable == "true")
            {
                feedback += "You bash the " + item.name;
                item.transparent = "false";
                if(item.soundOnBash != "undefined")
                {
                    playSound(item.soundOnBash);
                }
                if(item.contains.length > 0)
                {
                    feedback += " and break it. <br> Inside the " + item.name + " you find " + printContainerItems(item);
                    item.broken = "true";
                    var scene = getScene(player.currentScene);
                    scene.objects = scene.objects.concat(item.contains);
                    item.contains = [];
                }
                
            }else
            {
                feedback += "You fail to break the " + item.name;
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.broken == "true")
            {
                feedback += "The " + item.name + " is already broken.";
            }else
            if(item.breakable == "true")
            {
                feedback += "You bash the " + item.name;
                item.transparent = "false";
                if(item.soundOnBash != "undefined")
                {
                    playSound(item.soundOnBash);
                }
                if(item.contains.length > 0)
                {
                    feedback += " and break it. <br> Inside the " + item.name + " you find " + printContainerItems(item);
                    item.broken = "true";
                    var scene = getScene(player.currentScene);
                    scene.objects = scene.objects.concat(item.contains);
                    item.contains = [];
                }
                
            }else
            {
                feedback += "You fail to break the " + item.name;
            }
        }
    }
    // GO
    if(checkAnyWord('go', words))
    {
        var itemsByName = getItemsByName(sceneItems, words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems, words);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one thing."
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(checkAnyWord('through', words))
            {
                if(getScene(item.leadsTo))
                {
                    if(item.open == "true")
                    {
                        feedback += "You go through the " + item.name + " and arrive in the " + item.leadsTo;
                        player.currentScene = item.leadsTo;
                    }else
                    {
                        feedback += "The " + item.name + " is not open.";
                    }
                }else
                {
                    feedback += "The " + item.name + " does not lead anywhere.";
                }
            }else
            {
                feedback += "You need to use the word THROUGH when going somewhere."
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(checkAnyWord('through', words))
            {
                if(getScene(item.leadsTo))
                {
                    if(item.open == "true")
                    {
                        feedback += "You go through the " + item.name + " and arrive in the " + item.leadsTo;
                        player.currentScene = item.leadsTo;
                    }else
                    {
                        feedback += "The " + item.name + " is not open.";
                    }
                }else
                {
                    feedback += "The " + item.name + " does not lead anywhere.";
                }
            }else
            {
                feedback += "You need to use the word THROUGH when going somewhere."
            }
        }
        else
        {
            feedback += "You need to specify what you want to go through."
        }
    }
    // READ
    if(checkAnyWord('read', words))
    {
        if(item)
        {
            if(item.readable == "true")
            {
                feedback += "Loading file...";
                loadTextFile(adventure.name, item.onRead);
            }
        }
    }
    // SEARCH
    if(checkAnyWord('search', words))
    {
        feedback += "After a thorough search you find: " + searchRoom();
    }
    // USE
    if(checkAnyWord('use', words))
    {
        var itemsByName = getItemsByName(sceneItems, words);
        var itemsByUnderstandAs = getItemsByUnderstandAs(sceneItems, words);
        console.log("items by name", itemsByName);
        console.log("items by understand as", itemsByUnderstandAs);
        if(itemsByName.length > 1)
        {
            feedback += "Please specify only one things to use."
        }else
        if(itemsByName.length == 1)
        {
            item = itemsByName[0];
            if(item.onUse != "")
            {
                var funcArg = item.onUse.split("|");
                var func = funcArg[0];
                var arg = funcArg[1];
                var callback = funcArg[2];
                var callbackArg = funcArg[3];
                if(window.hasOwnProperty(func))
                {
                    feedback += window[func](arg, callback, callbackArg);
                }
                if(item.soundOnUse != "undefined")
                {
                    playSound(item.soundOnUse);
                }
            }else
            {
                feedback+= "There is no special use for the " + item.name;
            }
        }else
        if(itemsByUnderstandAs.length > 1)
        {
            feedback += "Which " + itemsByUnderstandAs[0].understandAs + " do you mean?";
        }else
        if(itemsByUnderstandAs.length == 1)
        {
            item = itemsByUnderstandAs[0];
            if(item.onUse != "")
            {
                var funcArg = item.onUse.split("|");
                var func = funcArg[0];
                var arg = funcArg[1];
                if(window.hasOwnProperty(func))
                {
                    feedback += window[func](getItemByName(arg));
                }
                if(item.soundOnUse != "undefined")
                {
                    playSound(item.soundOnUse);
                }
            }else
            {
                feedback+= "There is no special use for the " + item.name;
            }
        }else
        {
            feedback += "Please specify what you want to use.";
        }
    }
    //inventory
    if(checkAnyWord('inventory', words))
    {
        if(player.inventory.length > 0)
        {
            feedback = "You have " + printItems(player.inventory) + " in your inventory.";
        }else
        {
            feedback += "Your inventory is emtpy.";
        }
    }
    go.adventureScene.innerHTML = player.currentScene.sceneDescription;
    go.adventureFeedback.innerHTML = feedback;
}
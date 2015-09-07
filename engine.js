function isWin()
{
    var grid = []
    for(var i = 0; i < model.count-1; i++)
        grid[i] = model.get(i).someText

    var check = false, j = 0
    while(j < grid.length-1)
    {
        if(grid[j] > grid[j+1]) {check = false; break}
        else check = true
        j++
    }

    return Boolean(check)
}
function move(index)
{
    board.currentIndex = index
    var empty

    if((board.currentIndex+1)<model.count && model.get(board.currentIndex+1).someText === 0)
    {
        if(board.currentIndex + 1 % 4 !== 0)
        {
            empty = board.currentIndex+1
            model.move(board.currentIndex, empty, 1)
            model.move(empty - 1, board.currentIndex, 1)

            if(isWin()) winWindow.visible = true
            else winWindow.visible = false
        }
    }
    if((board.currentIndex-1)>=0 && (model.get(board.currentIndex-1).someText === 0))
    {
        if(board.currentIndex % 4 !== 0)
        {
            empty = board.currentIndex-1
            model.move(board.currentIndex, empty, 1)
            model.move(empty + 1, board.currentIndex, 1)

            if(isWin()) winWindow.visible = true
            else winWindow.visible = false
        }
    }
    if((board.currentIndex+4)<model.count && (model.get(board.currentIndex+4).someText === 0))
    {
        empty = board.currentIndex+4
        model.move(board.currentIndex, empty, 1)
        model.move(empty - 1, board.currentIndex, 1)

        if(isWin()) winWindow.visible = true
        else winWindow.visible = false
    }
    if((board.currentIndex-4)>=0 && (model.get(board.currentIndex-4).someText === 0))
    {
        empty = board.currentIndex-4
        model.move(board.currentIndex, empty, 1)
        model.move(empty + 1, board.currentIndex, 1)

        if(isWin()) winWindow.visible = true
        else winWindow.visible = false
    }
}

function shuffle()
{
    var N = 0;

    do
    {
        var grid = [1, 2, 3, 4,
                    5, 6, 7, 8,
                    9,10,11,12,
                    13,14,15]

        var currentIndex = grid.length
        var temporaryValue, randomIndex

        while (currentIndex)
        {
            randomIndex = Math.floor(Math.random() * currentIndex--);

            temporaryValue = grid[currentIndex];
            grid[currentIndex] = grid[randomIndex];
            grid[randomIndex] = temporaryValue;
        }

        model.clear()
        for(var i = 0; i < grid.length; i++)
            model.append({"someText": grid[i], "someColor": "skyblue"})
        model.append({"someText": 0, "someColor": "skyblue"})

        // is it possible to solve

        var k = 0;

        for(var i = 0; i < model.count-1; i++)
        {
            for(var j = i; j < model.count; j++)
            {
                if(grid[j] < grid[i])
                    k++
            }
        }
        N = k + 4
    }
    while(N % 2 !== 0)
}

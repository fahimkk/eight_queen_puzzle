# Functional versus imperative programming

SIZE = 8

# imperative
def printBoard_imp(partial):
    for digit in partial:
        col = int(digit)
        line = ' . ' * (col - 1) + ' Q ' + ' . ' * (SIZE-col)
        print(line)

# funtional
def printBoard_func(partial):
    if partial:
        col = int(partial[0])
        line = ' . ' * (col - 1) + ' Q ' + ' . ' * (SIZE-col)
        print(line)
        printBoard_func(partial[1:])

# checkPlacement which takes two parameters, a partial solution (here '1425') and a column number (here 3).
#  It returns True if placement is possible. 

# imperative version:
def checkPlacement_imp(partial, col):
    row = len(partial)  # row we're adding
    if partial:
        spread = 1
        for prow in range(row-1, -1, -1):   # previous rows
            if int(partial[prow]) in (col, col-spread, col+spread):
                return False
            spread +=1
    return True


def checkPlacement_func(partial, col, spread=1):
    if not partial: return True 
    else:
        if int(partial[-1]) in (col, col-spread, col+spread):
            return False
        else:
            return checkPlacement_func(partial[:-1], col, spread+1)

# imperative version:
def findSolutions():
    partials = ['']                 # just an empty chessboard (this is not a empty list)
    while partials:
        partial = partials.pop(0)   # pop(0) will return the first element
        if len(partial) >= SIZE:    #  (len(['']) = 1) 
            solution = partial
            print (partial)         # a solution
        else:
            for col in range(1, SIZE+1):
                if checkPlacement_imp(partial, col):
                    partials.append(partial+str(col))

# function version

def expandSolution(partial):
    if len(partial) >= SIZE:
        print(partial)  # a solution
        return []
    else:
        pairs = zip([partial]* SIZE, range(1, SIZE+1))
        pairs = filter(lambda p: checkPlacement_func(p[0],p[1]), pairs)
        # map returns a map in python 3, so convert it into a list.
        pairs = list(map(lambda  p: '%s%d'%p, pairs))
        return pairs
def findSolutions_func(partials=['']):
    if partials:
        partials = map(expandSolution, partials)
        from functools import reduce
        partials = reduce(lambda x,y: x+y, partials)
        findSolutions_func(partials)
    return

findSolutions_func()
// Functional versus imperative programming

var SIZE = 8;

//imperative
function printBoard_imp(partial){
    for (digit of partial){
        let col = parseInt(digit);
        // to repeat a string we use repeat method.
        let line = ' . '.repeat(col - 1) + ' Q ' + ' . '.repeat(SIZE-col);
        console.log(line);
    }
}
// function method
function printBoard_func(partial){
    if (partial){
        let col = partial[0];
        let line = ' . '.repeat(col - 1) + ' Q ' + ' . '.repeat(SIZE-col);
        console.log(line);
        printBoard_func(partial.slice(1,));
    }
}

// checkPlacement which takes two parameters, a partial solution (here '1425') and a column number (here 3).
// It returns True if placement is possible. 

// imperative method
function checkPlacement_imp(partial, col){
    let row = partial.length ; 
    if(row > 0){
        let spread = 1;
        for (let i = row-1; i >=0; i--){
            // parseInt takes 2 args, string and base
           if([col, col-spread, col+spread].includes(parseInt(partial[i],10))){
               return false;
           } 
           spread +=1;

        }     
    } return true;
}

// function method
function checkPlacement_func(partial, col, spread=1){
    if (partial.length ==0 ){
        return true; 
    }
    else{
        if([col, col-spread, col+spread].includes(parseInt(partial[partial.length-1],10))){
            return false;
        }else{
            checkPlacement_func(partial.slice(0,partial.length-1),col, spread+1)
            // without this return, function will returns undefined.
            return true;
        }
    }
}



// imperative method:
function findSolution_imp(){
    let partials = ['']
    while(partials.length>0){
        let partial= partials.shift();
        if (partial.length >= SIZE){
            console.log(partial+',');
        }else{
            for (let i=1; i<= SIZE; i++){
                if(checkPlacement_imp(partial,i)){
                    partials.push(partial + i.toString())
                }
            }
        }
    }
}

// function method:
function findSolution_func(partials=['']){
    if(partials.length>0){
        partials = partials.map(p=>expandSolution(p));
        partials = partials.reduce((x,y)=> x.concat(y))
        findSolution_func(partials)
    }
    return ;
}
function expandSolution(partial){
    if (partial.length >= SIZE){
        console.log(partial);
        return [];
    } else{
        let pairs = [];
        for (let i=1; i <=SIZE; i++){
            pairs.push([partial,i])
        }
        pairs = pairs.filter(p=>checkPlacement_func(p[0],p[1]));
        pairs = pairs.map(p=>`${p[0]+p[1]}`);
        return pairs;
    }
}
//findSolution_func();
//findSolution_imp();

// to check the checkPlacement_func and checkPlacement_imp
var list=[
    15863724,
16837425,
17468253,
17582463,
24683175,
25713864,
25741863,
26174835,
26831475,
27368514,
27581463,
28613574,
31758246,
35281746,
35286471,
35714286,
35841726,
36258174,
36271485,
36275184,
36418572,
36428571,
36814752,
36815724,
36824175,
37285146,
37286415,
38471625,
41582736,
41586372,
42586137,
42736815,
42736851,
42751863,
42857136,
42861357,
46152837,
46827135,
46831752,
47185263,
47382516,
47526138,
47531682,
48136275,
48157263,
48531726,
51468273,
51842736,
51863724,
52468317,
52473861,
52617483,
52814736,
53168247,
53172864,
53847162,
57138642,
57142863,
57248136,
57263148,
57263184,
57413862,
58413627,
58417263,
61528374,
62713584,
62714853,
63175824,
63184275,
63185247,
63571428,
63581427,
63724815,
63728514,
63741825,
64158273,
64285713,
64713528,
64718253,
68241753,
71386425,
72418536,
72631485,
73168524,
73825164,
74258136,
74286135,
75316824,
82417536,
82531746,
83162574,
84136275,
]

for (num of list){
    let num_str = num.toString();
    for (let i=1; i<=8; i++){
        let check = num_str.slice(0,i);
        let col_num = parseInt(num_str[i],10)
        if(checkPlacement_func(check, col_num)!=checkPlacement_imp(check,col_num)){
            console.log(num_str+',')
        }
    }
}
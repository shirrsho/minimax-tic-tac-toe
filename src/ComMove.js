import React, { useState } from 'react';

export const comMove = (squares) => {
    let board = [...squares]
    let bestMove = -1;
    let score = -Infinity;

    for(let i = 0 ; i < 10 ; i++){
        if(board[i]==''){
            board[i] = 'r'
            let minimax_score = minimax(board,false,1,-Infinity,Infinity);
            if(minimax_score > score){
                bestMove = i;
                score = minimax_score;
            }
            board[i] = ''
        }
    }
    console.log("best: ", bestMove);
    squares[bestMove] = 'r'; // Computer max player
    bestMove = -1;
}

function checkForWinner(squares){
    if(squares[0]!==''&&squares[0]==squares[1]&&squares[1]==squares[2]) return squares[0]
		else if(squares[3]!==''&&squares[3]==squares[4]&&squares[4]==squares[5]) return squares[3]
		else if(squares[6]!==''&&squares[6]==squares[7]&&squares[7]==squares[8]) return squares[6]
		
		else if(squares[0]!==''&&squares[0]==squares[3]&&squares[3]==squares[6]) return squares[0]
		else if(squares[1]!==''&&squares[1]==squares[4]&&squares[4]==squares[7]) return squares[1]
		else if(squares[2]!==''&&squares[2]==squares[5]&&squares[5]==squares[8]) return squares[2]
 		else if(squares[0]!==''&&squares[0]==squares[4]&&squares[4]==squares[8]) return squares[0]
		else if(squares[2]!==''&&squares[2]==squares[4]&&squares[4]==squares[6]) return squares[2]
}

function draw(board){
    for(let i = 0 ; i < 10 ; i++)
        if(board[i]=='') return false
    return true
}

function minimax(board, maxPlayer, depth, alpha, beta){
    
    // if(winner=='r') return 10;
    // else if(winner=='b') return -10;
    //if(depth==3) {
    let w = checkForWinner(board)
    if(w=='r') return 10;
    else if(w=='b') return -10;
    if(draw(board)) return 0;
    //}

    //console.log(depth);
    let score = 0;
    if(maxPlayer) score = -Infinity;
    else score = Infinity;

    for(let i = 0 ; i < 10 ; i++){
        if(board[i]==''){
            if(maxPlayer) {
                board[i] = 'r';
                let minimax_score = minimax(board,false,depth+1,alpha,beta)
                score = Math.max(score, minimax_score);
                alpha = Math.max(score,alpha)
                board[i] = ''
                if(alpha>=beta) {console.log('max prunned'); break;}
            }
            else {
                board[i] = 'b';
                let minimax_score =  minimax(board,true,depth+1,alpha,beta)
                score = Math.min(score, minimax_score);
                beta = Math.min(minimax_score,beta)
                board[i] = ''
                if(alpha>=beta) {console.log('min prunned'); break;}
            }
        }
    }

    return score;
}
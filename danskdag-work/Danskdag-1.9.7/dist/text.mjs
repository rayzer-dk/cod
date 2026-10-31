export function findWord(text,target){
 if(!target)return null;
 const escaped=target.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const match=new RegExp(`(^|[^\\p{L}\\p{N}_])(${escaped})(?=$|[^\\p{L}\\p{N}_])`,'iu').exec(text);
 return match?{index:match.index+match[1].length,value:match[2]}:null;
}

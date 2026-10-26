// Cardinal spelling: Dansk Sprognævn, Retskrivningsordbogen §19.4.
const small=['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten'];
const tens=['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'];

export function numberToDanish(value){
 if(!Number.isSafeInteger(value)||value<0||value>9999)throw new RangeError('Expected an integer from 0 to 9999');
 if(value<20)return small[value];
 if(value<100){const unit=value%10;return (unit?small[unit]+'og':'')+tens[Math.floor(value/10)];}
 const scale=value<1000?100:1000,count=Math.floor(value/scale),rest=value%scale;
 const head=(count===1?'et':small[count])+(scale===100?' hundrede':' tusind');
 return head+(rest?(scale===100||rest<100?' og ':' ')+numberToDanish(rest):'');
}

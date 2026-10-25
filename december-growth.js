/* December tree: 31 distinct, cumulative painted stages.
   Source paintings remain unchanged; only the snow/branches/sky regions
   advance between stages. All views (capsule, preview and book) share this. */
(function(global){
 "use strict";
 const FOLDER="./capsule-assets/december/";
 const FIRST=new URL(FOLDER+"tree-start.webp",document.baseURI).href;
 const LAST=new URL(FOLDER+"tree-final.webp",document.baseURI).href;
 const RES=256;
 let originals=null, arrivalMap=null;
 const cache=new Map(), pending=new Map();
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const fract=v=>v-Math.floor(v);
 const smooth=t=>t*t*(3-2*t);
 function hash(x,y){return fract(Math.sin(x*127.1+y*311.7+19)*43758.5453)}
 function noise(x,y,scale){
  const xx=x*scale,yy=y*scale,a=Math.floor(xx),b=Math.floor(yy);
  const fx=smooth(fract(xx)),fy=smooth(fract(yy));
  const c=hash(a,b)+(hash(a+1,b)-hash(a,b))*fx;
  const d=hash(a,b+1)+(hash(a+1,b+1)-hash(a,b+1))*fx;
  return (c+(d-c)*fy-.5)*2;
 }
 function logistic(v){return 1/(1+Math.exp(-v))}
 function getArrivals(){
  if(arrivalMap)return arrivalMap;
  const values=new Float32Array(RES*RES);
  for(let py=0;py<RES;py++){
   const y=(py+.5)/RES;
   for(let px=0;px<RES;px++){
    const x=(px+.5)/RES;
    const variation=noise(x,y,6)*.8+noise(x,y,3)*.9;
    const ground=2+(1-y)*23+(x-.5)*1.3+variation;
    const branches=14+(0.60-y)*19+(0.55-x)*2+variation;
    const sky=25+(0.62-y)*8+variation;
    const bottom=logistic((y-.62)/.045);
    const tree=logistic((x-.38)/.065)*(1-logistic((y-.60)/.045));
    const arrival=(1-bottom)*(sky+(branches-sky)*tree)+bottom*ground;
    values[py*RES+px]=clamp(arrival,1,30);
   }
  }
  arrivalMap=values;
  return values;
 }
 function loadImage(url){
  return new Promise((resolve,reject)=>{
   const image=new Image();
   image.decoding="async";
   image.onload=()=>resolve(image);
   image.onerror=()=>reject(new Error("Не удалось загрузить иллюстрацию декабря: "+url));
   image.src=url;
  });
 }
 function getOriginals(){
  if(!originals)originals=Promise.all([loadImage(FIRST),loadImage(LAST)]).catch(error=>{originals=null;throw error});
  return originals;
 }
 function frameNumber(value){return clamp(Math.floor(Number(value)||0),0,31)}
 async function draw(stage){
  const [before,after]=await getOriginals();
  const w=after.naturalWidth||1254,h=after.naturalHeight||1254;
  const values=getArrivals();
  const mask=document.createElement("canvas");
  mask.width=RES;mask.height=RES;
  const maskContext=mask.getContext("2d");
  if(!maskContext)throw Error("Рисование дерева недоступно на этом устройстве");
  const pixels=maskContext.createImageData(RES,RES);
  for(let i=0;i<values.length;i++){
   const p=clamp((stage-values[i]+1.85)/3.7,0,1);
   const offset=i*4;
   pixels.data[offset]=255;pixels.data[offset+1]=255;
   pixels.data[offset+2]=255;pixels.data[offset+3]=Math.round(smooth(p)*255);
  }
  maskContext.putImageData(pixels,0,0);
  const overlay=document.createElement("canvas");
  overlay.width=w;overlay.height=h;
  const overlayContext=overlay.getContext("2d");
  if(!overlayContext)throw Error("Рисование дерева недоступно на этом устройстве");
  // Early snow stays subdued under the overcast sky; warmth arrives gradually.
  const brightness=(.62+.38*Math.pow(stage/31,1.15)).toFixed(3);
  const saturation=(.48+.52*stage/31).toFixed(3);
  overlayContext.filter="brightness("+brightness+") saturate("+saturation+")";
  overlayContext.drawImage(after,0,0,w,h);
  overlayContext.filter="none";
  overlayContext.globalCompositeOperation="destination-in";
  overlayContext.drawImage(mask,0,0,w,h);
  overlayContext.globalCompositeOperation="source-over";
  const composed=document.createElement("canvas");
  composed.width=w;composed.height=h;
  const ctx=composed.getContext("2d");
  if(!ctx)throw Error("Рисование дерева недоступно на этом устройстве");
  ctx.drawImage(before,0,0,w,h);
  ctx.drawImage(overlay,0,0,w,h);
  return composed.toDataURL("image/webp",.88);
 }
 async function getFrame(value){
  const stage=frameNumber(value);
  if(stage===0)return FIRST;
  if(stage===31)return LAST;
  if(cache.has(stage)){
   const value=cache.get(stage);
   cache.delete(stage);cache.set(stage,value);
   return value;
  }
  if(pending.has(stage))return pending.get(stage);
  const work=draw(stage).then(uri=>{
   pending.delete(stage);
   cache.set(stage,uri);
   while(cache.size>7)cache.delete(cache.keys().next().value);
   return uri;
  },error=>{pending.delete(stage);throw error});
  pending.set(stage,work);
  return work;
 }
 global.AntiShumDecemberGrowth=Object.freeze({getFrame,stageCount:31,first:FIRST,last:LAST});
})(window);

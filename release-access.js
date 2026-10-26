/* Standalone prelaunch guard for secondary sections.
   Enforced only after owner explicitly enables release-config.js.
   Rules remain available from the release waiting scene. */
(function(){
"use strict";
if(window.AntiShumRelease?.enabled !== true)return;
document.documentElement.classList.add("ash-prelaunch-check");
const style=document.createElement("style");
style.textContent="html.ash-prelaunch-check body{visibility:hidden!important}";
document.head.appendChild(style);
const start=async()=>{
 try{
  if(!window.supabase)throw Error("Auth unavailable");
  const client=window.supabase.createClient(
   "https://mkyendzqoohqcwnycuys.supabase.co",
   "sb_publishable_wscrhaPifbezRTe4rWs-Wg_j0kGqktT",
   {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:"anti-shum-auth"}}
  );
  const {data:{user},error}=await client.auth.getUser();
  if(error||!user||user.is_anonymous)throw Error("Not signed in");
  const {data:admin,error:adminError}=await client.rpc("is_anti_shum_admin");
  if(adminError||admin!==true)throw Error("Prelaunch access restricted");
  document.documentElement.classList.remove("ash-prelaunch-check");
 }catch(error){
  window.location.replace(new URL("./",window.location.href).href);
 }
};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
else start();
})();
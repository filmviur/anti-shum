/* Account lifecycle. Independent of ordinary profile editing and release timing. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const open=id=>$(id).classList.remove("hidden");
const close=id=>$(id).classList.add("hidden");
const plainError=error=>(error?.message||"Произошла ошибка. Попробуй ещё раз.");
let passwordRecoveryActive=false, restoreDeadline=null;
window.ashPasswordRecoveryActive=false;
function setText(id,value){const target=$(id);if(target)target.textContent=value;}
function accountStatus(id,text){setText(id,text);}
function deadlineText(value){
 if(!value)return "дата не определена";
 return new Date(value).toLocaleString("ru-RU",{
  timeZone:"Europe/Kyiv",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"
 })+" по Киеву";
}
function setRecoveryView(status,deadline){
 restoreDeadline=deadline;
 close("authHelpDialog");close("passwordRecoveryDialog");
 close("authScreen");close("bootScreen");close("appScreen");
 const blocked=$("blockedScreen");if(blocked)blocked.classList.add("hidden");
 setText("accountRestoreTitle",status==="expired"?"Срок восстановления закончился":"Твой профиль сохранён");
 setText("accountRestoreMessage",status==="expired"
  ?"30 дней для возвращения прошли. Профиль ожидает окончательного удаления; восстановление через сайт больше недоступно."
  :"Ты просил удалить профиль. Пока действует период восстановления, можно вернуть прежние ответы, фотографии, книгу и продолжить участие с того же места.");
 setText("accountRestoreDeadline",deadline
  ? "Восстановление до "+deadlineText(deadline)
  : "Если ошибка повторится, обратись в поддержку.");
 $("accountRestoreAccept").classList.toggle("hidden",status!=="recoverable");
 accountStatus("accountRestoreStatus","");
 open("accountRestoreView");
}
window.ashAccountCheckOnLogin=async function(){
 if(!currentUser?.id)return false;
 const {data,error}=await supabaseClient.rpc("anti_shum_my_deletion_status");
 if(error){
  console.error("Account deletion status:",error);
  setRecoveryView("expired",null);
  setText("accountRestoreTitle","Не удалось проверить профиль");
  setText("accountRestoreMessage","Не удалось проверить статус аккаунта. Попробуй войти позже или обратись в поддержку.");
  $("accountRestoreAccept").classList.add("hidden");
  return true;
 }
 if(data?.status!=="recoverable"&&data?.status!=="expired"){
  close("accountRestoreView");return false;
 }
 setRecoveryView(data.status,data.restore_before);
 return true;
};
window.ashShowPasswordRecovery=function(){
 passwordRecoveryActive=true;
 window.ashPasswordRecoveryActive=true;
 close("bootScreen");close("appScreen");close("authScreen");
 close("accountRestoreView");
 $("recoveryNewPassword").value="";
 $("recoveryRepeatPassword").value="";
 accountStatus("passwordRecoveryStatus","");
 open("passwordRecoveryDialog");
 $("recoveryNewPassword").focus();
};
$("authRecoveryHelpBtn").addEventListener("click",()=>{
  $("forgotPasswordEmail").value=$("emailInput").value.trim();
  accountStatus("authRecoveryStatus","");
  open("authHelpDialog");
});
$("authRestoreProfileBtn").addEventListener("click",()=>{
  $("forgotPasswordEmail").value=$("emailInput").value.trim();
  accountStatus("authRecoveryStatus","Чтобы вернуть профиль с прежними записями, войди в тот же аккаунт. После входа появится кнопка восстановления. Если забыл пароль, отправь письмо для его сброса.");
  open("authHelpDialog");
});
$("closeAuthHelpDialog").addEventListener("click",()=>close("authHelpDialog"));
$("sendResetEmailBtn").addEventListener("click",async()=>{
 const email=$("forgotPasswordEmail").value.trim();
 if(!/^\S+@\S+\.\S+$/.test(email)){accountStatus("authRecoveryStatus","Укажи правильный email.");return}
 const button=$("sendResetEmailBtn");button.disabled=true;
 try{
  const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{
   redirectTo:new URL("./",window.location.href).href
  });
  if(error)throw error;
  accountStatus("authRecoveryStatus","Если этот email зарегистрирован, на него придёт письмо со ссылкой для смены пароля. Проверь также папку «Спам». Твои записи сохранятся.");
 }catch(e){console.error("Reset request:",e);accountStatus("authRecoveryStatus","Не удалось отправить письмо: "+plainError(e))}
 finally{button.disabled=false}
});
$("recoveryNewPassword").addEventListener("input",()=>accountStatus("passwordRecoveryStatus",""));
$("saveRecoveredPasswordBtn").addEventListener("click",async()=>{
 const one=$("recoveryNewPassword").value,two=$("recoveryRepeatPassword").value;
 if(one.length<8){accountStatus("passwordRecoveryStatus","Придумай пароль не короче 8 символов.");return}
 if(one!==two){accountStatus("passwordRecoveryStatus","Пароли не совпадают.");return}
 const button=$("saveRecoveredPasswordBtn");button.disabled=true;
 try{
  const {error}=await supabaseClient.auth.updateUser({password:one});
  if(error)throw error;
  passwordRecoveryActive=false;window.ashPasswordRecoveryActive=false;
  close("passwordRecoveryDialog");
  await supabaseClient.auth.signOut();
  setAuthMode("login");
  setAuthMessage("Пароль обновлён. Теперь войди с новым паролем — все данные профиля сохранены.");
 }catch(e){accountStatus("passwordRecoveryStatus",plainError(e));console.error("Password recovery:",e)}
 finally{button.disabled=false}
});
$("cancelRecoveredPasswordBtn").addEventListener("click",async()=>{
  passwordRecoveryActive=false;window.ashPasswordRecoveryActive=false;
  close("passwordRecoveryDialog");
  await supabaseClient.auth.signOut();
});
$("openDeleteProfileBtn").addEventListener("click",()=>{
 if(!currentUser||isCurrentUserAdmin)return;
 close("editProfileModal");open("accountDeleteWarning1");
});
$("cancelAccountDelete1").addEventListener("click",()=>close("accountDeleteWarning1"));
$("continueAccountDelete1").addEventListener("click",()=>{
 close("accountDeleteWarning1");
 $("accountDeleteTypedConfirmation").value="";
 $("confirmAccountDelete2").disabled=true;
 accountStatus("accountDeleteStatus","");
 open("accountDeleteWarning2");
});
$("cancelAccountDelete2").addEventListener("click",()=>close("accountDeleteWarning2"));
$("accountDeleteTypedConfirmation").addEventListener("input",()=>{
 $("confirmAccountDelete2").disabled=$("accountDeleteTypedConfirmation").value.trim()!=="УДАЛИТЬ";
});
$("confirmAccountDelete2").addEventListener("click",async()=>{
 if($("accountDeleteTypedConfirmation").value.trim()!=="УДАЛИТЬ"||!currentUser)return;
 const button=$("confirmAccountDelete2");button.disabled=true;
 try{
  const {data,error}=await supabaseClient.rpc("anti_shum_request_account_deletion");
  if(error)throw error;
  close("accountDeleteWarning2");
  close("accountDeleteWarning1");
  await supabaseClient.auth.signOut();
  setAuthMode("login");
  setAuthMessage("Профиль приостановлен. Вернуться со всеми данными можно до "+deadlineText(data?.restore_before)+". Для восстановления войди в прежний аккаунт.");
 }catch(e){
  accountStatus("accountDeleteStatus","Не удалось оформить удаление: "+plainError(e));
  console.error("Account delete:",e);
 }finally{button.disabled=false}
});
$("accountRestoreAccept").addEventListener("click",async()=>{
 const button=$("accountRestoreAccept");button.disabled=true;
 try{
  const {error}=await supabaseClient.rpc("anti_shum_restore_account");
  if(error)throw error;
  close("accountRestoreView");
  appInitializedUserId=null;
  await initializeUser();
 }catch(e){
  console.error("Account restore:",e);
  accountStatus("accountRestoreStatus","Не удалось восстановить профиль: "+plainError(e));
 }finally{button.disabled=false}
});
$("accountRestoreLogout").addEventListener("click",async()=>{
 close("accountRestoreView");
 await supabaseClient.auth.signOut();
});
for(const overlayId of ["authHelpDialog","accountDeleteWarning1","accountDeleteWarning2"]){
 $(overlayId).addEventListener("click",event=>{
  if(event.target===$(overlayId))close(overlayId);
 });
}
document.addEventListener("keydown",event=>{
 if(event.key!=="Escape")return;
 for(const id of ["authHelpDialog","accountDeleteWarning1","accountDeleteWarning2"]){
  if(!$(id).classList.contains("hidden"))close(id);
 }
});
})();

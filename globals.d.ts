import { group } from "./src/core/Api";
import { IndexedDBHandler } from "./src/core/IndexedDBhandler";
import { Query } from "./src/core/Query";

declare module '*.css';
declare module "*.html" {
    const content: string;
    export default content;
}

export {};

declare global {

  const SCRIPT_INFO: {
    version:string
    date:number
    dev:string
    git:string
  }

  interface pageData{
    pageCnt:number,
    villages:village[]
  }

  type coord = {
    x:number,
    y:number,
    text:string
  }

  type units = {
    spear:number,
    sword:number,
    archer:number,
    axe:number,
    spy:number,
    light:number,
    marcher:number,
    heavy:number,
    ram:number,
    catapult:number,
    knight:number,
    snob:number,
  }

  interface build {
    destroy:number
  }

  interface misc{
    kill_ranking:number,
    tutorial:number,
    trade_cancel_time:number,
  }

  interface commands{
    millis_arrival:number,
    command_cancel_time:number
  }

  interface newbie{
    days:number,
    ratio_days:number
    ratio:number
    removeNewbieVillages:number
  }

  interface game{
    buildtime_formula:number
    knight:number
    knight_new_items:number
    knight_archer_bonus:number
    archer:number
    tech:number
    farm_limit:number
    church:number
    watchtower:number
    stronghold:number
    fake_limit:number
    barbarian_rise:number
    barbarian_shrink:number
    barbarian_max_points:number
    scavenging:number
    hauls:number
    hauls_base:number
    hauls_max:number
    base_production:number
    event:number
    suppress_events:number
  }

  interface buildings{
    custom_main:number
    custom_farm:number
    custom_storage:number
    custom_place:number
    custom_barracks:number
    custom_church:number
    custom_smith:number
    custom_wood:number
    custom_stone:number
    custom_iron:number
    custom_market:number
    custom_stable:number
    custom_wall:number
    custom_garage:number
    custom_hide:number
    custom_snob:number
    custom_statue:number
    custom_watchtower:number
  }

  interface snob{
    gold:number
    cheap_rebuild:number
    rise:number
    max_dist:number
    factor:number
    coin_wood:number
    coin_stone:number
    coin_iron:number
    no_barb_conquer:number
  }

  interface ally{
    no_harm:number
    no_other_support:number
    no_other_support_type:number
    allytime_support:number
    no_leave:number
    no_join:number
    limit:number
    fixed_allies:number
    wars_member_requirement:number
    wars_points_requirement:number
    wars_autoaccept_days:number
    levels:number
    xp_requirements:number
  }

  interface config_coord{
    map_size:number,
    func:number,
    empty_villages:number,
    bonus_villages:number,
    inner:number,
    select_start:number,
    village_move_wait:number,
    snob_restart:number,
    start_villages:number,
  }

  interface sitter{
    allow:number
  }

  interface sleep{
    active:number,
    delay:number,
    min:number,
    max_awake:number,
    min_awake:number,
    warn_time:number,
  }

  interface night{
    active:number,
    start_hour:number,
    end_hour:number,
    def_factor:number,
    duration:number,
  }

  interface win{
    check:number
  }

  interface gameConfig {
    speed:number,
    unit_speed:number,
    moral:number,
    build:build,
    misc:misc,
    commands:commands
    newbie:newbie
    game:game
    buildings:buildings
    snob:snob
    ally:ally
    coord:config_coord
    sitter:sitter
    sleep:sleep
    night:night
    win:win
  }

  interface unitConfig {
    archer?:unitData
    axe:unitData
    catapult:unitData
    heavy:unitData
    knight:unitData
    light:unitData
    marcher?:unitData
    ram:unitData
    snob:unitData
    spear:unitData
    spy:unitData
    sword:unitData
  }

  interface unitData {
    build_time:number
    pop:number
    speed:number
    attack:number
    defense:number
    defense_cavalry:number
    defense_archer:number
    carry:number
  }

  
  interface player {
    id:number,
    name:string,
    allyId:number
    villageCnt:number
    pionts:number
    rank:number
  }

  type village = {
    id:number,
    name:string,
    coord:coord,
    kontinent:number,
    owner:number,
    popRemain:number|null,
    popSize:number|null,
    unitsContain:units|null,
    distance?:number
  }


  interface state{
    active:boolean
    possible:boolean
  }

  interface features{
    AccountManager:state
    FarmAssistent:state
    Premium:state
  }

  interface game_data{
    features:features
  }

  interface scriptOptions{
    latestApiUpdate:number
    gameConfig?:gameConfig
    unitConfig?:unitConfig
  }

  interface Window {
    game_data:game_data,
    Lang:string;
    DB:IndexedDBHandler,
    UI:UI,
    scriptOptions:scriptOptions
    Dialog:Dialog;
    attackPlan:plan;
    launchDialog:launchDialog;
    gameConfig:gameConfig
    unitConfig:unitConfig 
    Villages:village[],
    Players:player[],
    templateModal:templateModal
    editTargetModal:editTargetModal,
    editPlanNameModal:editPlanNameModal
    editArrivalsModal:editArrivalsModal
    editLaunchVillagesModal:editLaunchVillagesModal
    autoAssign:autoAssign
    Groups:group[];
    Plans:plan[];
    mainInit:()=> void;
    oderLaunchVillages:(by:string,re?:boolean)=> void;
    renderLaunchVillages:()=> void;
    partialRender:(launchers:village[],targets:target[])=> void;
    openAddLauncherWindow:() => void;
    openAutoAssignModal:() => void;
    addLauncher:(indTarget: number, indLanucher: number,trans:units,operation:string,arrival:string,notes:string) => boolean;
    addAttackConfirm:() => void;
    closeModal:() => void;
    createModal:(content:string,header:string) => void;
    launchVillagesQuery:Query;
    targetPoolQuery:Query;
    renderTargetVillages:()=>void;
    targetItem:targetItem,
    editTargets:()=>void;
    addTargets:()=>void;
    editTemplates:()=>void;
    editPlayerBoosts:()=>void;
    addPlayerBoost:()=>void;
    removePlayerBoost:()=>void;
    calculateAttack:()=>void;  
    confirmCalculateAttack:()=>void;
    changeDisplayType:()=>void;
    resetFilter:()=>void;
    search:()=>void;
    editName:()=>void;
    editArrivals:()=>void;
    resetAssignments:()=>void;
    finalResetAssignments:()=>void;
    latestArrival:string;
    latestTemplate:string;
  }

  interface autoAssign{
    addAssignment:() => void;
    removeAssignment:(id:Number) => void;
    fillAssignment:(id:Number) => void;
    checkAll:() => void;
    startAssignment:() => void;
    updateCount:(id:Number) => void;
    assignTypes:assignType[];
    launchPoolCopy:village[];
  }
  type assignmentCount = {
    id:number,
    cnt:number
  }

  type assignType = {
    id:string,
    template:template,
    filtered:village[],
    required:number,
    arrival:string,
    max:number
  }

  interface templateModal{
    addTemplate:()=>void;
    removeTemplate:()=>void; 
    selectTemplate:()=>void; 
    selectAll:(unit:string)=>void;
    templateRef:template[];
  }

  interface editTargetModal{
    addTargets:() => void;
    removeTargets:() => void;
    targetRef:target[];
  }

  interface editPlanNameModal{
    saveName:() => void;
    planRef?:plan
  }
  interface editArrivalsModal{
    addArrival:() => void;
    removeArrival:() => void;
    arrivalsRef?:string[];
  }

  interface editLaunchVillagesModal{
    launchVillagesRef?:village[]
    addGroup:() => void;
    removeGroup:() => void;
  }

  interface targetItem{
    toggleTargetItem:(elem:any)=> void;
    selectTargetItem:(event:Event) => void;
    removeTargetItem:(event:Event,target:number) => void;
    confirmRemoveTargetItem:(target:number) => void;
    removeTargetLauncherItem:(launcher:number,target:number)=>void;
    confirmRemoveTargetLauncherItem:(launcher:number,target:number)=>void;
    addVillageBooster:(event:Event,target:number) => void;
    confirmAddVillageBooster:(target:number) => void;
    removeVillageBooster:(event:Event,target:number) => void;
    confirmRemoveVillageBooster:(target:number) => void;
  }

  interface launchDialog {
    newplan:()=> void;
    createPlan: ()=> void;
    loadPlan:()=> void;
    removePlan:()=> void;
    confirmRemovePlan:()=> void;
    cancelRemovePlan:()=> void;
    goNext:(stepIn:number)=> void;
    goToStep:(stepIn:number)=> void;
    cancelNewPlan:()=> void;
    plan?:plan,
    stepCheck:()=> void;
    groupIDs:group[];
    currentStep:number;
  }

  interface UI {
    InfoMessage:(msg:string)=>void
    SuccessMessage:(msg:string)=>void
    ErrorMessage:(msg:string)=>void
  }
  
  interface Dialog{
    show : (name:string,content:string)=> void
    close: (name:string)=> void
  } 

  type speed={
    key:string
    value:number,
  }

  type attack ={
    villageFrom:village;
    villageTo:village;
    unitSpeed:speed;
    launchDate:string;
    launchLink:string;
    qrdata:string;
    isAttack:boolean;
    note:string
  }

  type boost ={
      playerId:number
      player:player,
      value:number
  }

  type target = {
      booster:number,
      village:village,
      launchers:launcher[],
      isOpen:boolean,
      isSelected:boolean,
  }

  type launcher ={
    village:village;
    arrival:string;
    isAttack:boolean;
    unitSpeed:speed;
    notes:string;
  }


  type unitSpeed = {
      archer:number;
      axe:number;
      catapult:number;
      heavy:number;
      knight:number;
      light:number;
      marcher:number;
      ram:number;
      snob:number;
      spear:number;
      spy:number;
      sword:number;
  }

  type targetCloseness ={
      target:village;
      table:village[];
  }

  type template ={
    name:string,
    units:units
  }

  type plan = {
    id:string,
    name:string,
    targetPool:target[];
    launchPool:village[];
    arrivals:string[];
    boosters:boost[];
    templates:template[]
  }
}
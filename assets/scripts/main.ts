// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BirdClass extends cc.Component {

  // 小鸟
  @property(cc.Node)
  birdNode: cc.Node

  // 管道
  @property(cc.Node)
  pipeLayerNode: cc.Node

  // 背景
  @property(cc.Node)
  bgNode: cc.Node

  // 屏幕
  @property(cc.Node)
  btnLayerNode: cc.Node

  isPlay: boolean = true
  upPower: number = 30

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.getPhysicsManager().enabled = true
  }

  start() {
    // 或者在cocos creator中给btnLayerNode拖拽一个点击
    this.bindClickEvent()
  }

  // 屏幕点击
  bindClickEvent() {
    this.btnLayerNode.on(cc.Node.EventType.TOUCH_START, event=>{
      // 点击屏幕改变小鸟的上移量
      this.birdFly()
    })
  }

  // 移动背景
  moveBg() {
    let bgList = this.bgNode.children
    for (let i = 0; i < bgList.length; i++) {
      bgList[i].x -= 2
      if (bgList[i].x <= -960) {
        bgList[i].x = 960
      }
    }
  }

  // 小鸟飞行
  birdFly() {
    if (this.isPlay) {
      // this.birdNode.y += this.upPower
      this.birdNode.runAction(cc.moveTo(1, this.birdNode.x, this.birdNode.y+=this.upPower).easing(cc.easeIn(3.0)))
    }
  }

  // 移动管道
  movePipe() {
    let pipeList = this.pipeLayerNode.children
    for (let i = 0; i < pipeList.length; i++) {
      let pipe = pipeList[i]
      pipe.x -= 3
      if (pipe.x <= -600) {
        pipe.x = 600
        pipe.y = this.randomNum()
      }
    }
  }

  // 生成随机数
  randomNum() {
    return Math.floor(Math.random() * 20 - 100)
  }

  // 生命周期函数
  update(dt) {
    if (this.isPlay) {
      this.moveBg()
      this.movePipe()
    }
  }
}

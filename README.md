# MineSweeperWeb
Play Mine Sweeper in your web browser! Have Fun!

# displays
## inputs
* rows
* columns
* bombs
* preset
* reset

## game
* remain bombs : number
* play time : time
* game board
  * unknown cell
  * flagged cell
  * suspicious cell (?)
  * bomb! (when game over)
    * stepped bomb
    * induced bomb
  * opened safe cell
    * no bombs cell
    * bombs counter cell
      * 1 ~ 8

# values
## inputs
* rows : number
* columns : number
* bombs : number
* preset : select

Table of Presets

## game
* remain bombs : number
* play time : time
* game board
    * unknown cell
    * flagged cell
    * suspicious cell (?)
    * bomb! (when game over)
        * stepped bomb
        * induced bomb
    * opened safe cell
        * no bombs cell
        * bombs counter cell
            * 1 ~ 8

# flow
## game Reset
1. get inputs from user with
   * custom input 
     * rows count
     * columns count
     * bombs count
   * presets
2. reset to reflect to game board
   * catch error this turn
   * reset game objects when reset


## game started

1. クリックした位置を安全位置にして、他マスからn個抽選し地雷設置
2. ゲーム開始
   1. 開示処理: 旗状態と開示状態で分岐
      * 旗⇒なにもしない
      * 開示済み⇒なにもしない
      * 旗じゃない & 未開示⇒開示位置の地雷有無で分岐
        * 地雷⇒ゲームオーバー
        * 地雷じゃない⇒地雷数を集計した結果で分岐
          * 集計結果が0⇒集計結果を表示して、周囲すべてに対して開示処理を行う
          * 集計結果が1以上⇒集計結果を表示する
   2. 右クリック処理: クリック位置の開示状態で分岐
      * 未開示⇒旗処理 (旗→?→ノーマーク)
      * 開示済み⇒周囲の？の有無で分岐
        * ?がある⇒なにもしない
        * ?がない⇒集計結果と旗の数で分岐
          * 一致⇒周囲すべてに対して開示処理呼び出し
          * 不一致⇒なにもしない
3. 爆弾以外がすべて開示されたらゲームオーバー(クリア)

# additional (planed)
* save game
  * save the game anb re-access the game with url link
* share and play same game
  * reset game and set the cell where must open at first play and generate url
    -> then share your friends and battle same game board and time wrap

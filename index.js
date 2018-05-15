'use strict';

var ls = window.localStorage;
var AppName = "MemoAppVer.1";
var temp = new Array(0);
var count = new Array;

function addMemo() {

    var v = $('newMemo').value;
    if (v == '' || v == null) {
        alert('メモが入力されていません。');
        return;
    }
    for (var i = 0; i < temp.length; i++) {
        if (v == temp[i]) {
            alert('それはもう発見済みです。');
            return;
        }
    }
    //変数tempへ文字列の代入 
    temp.unshift(v);
    save();
}
function display() {

    $('newMemo').value = '';
    var s = '<div class="line-bc">';
    for (var i = 0; i < 3; i++) {
        //データなしの場合はループから外れる処理
        if (temp.length == 0) {
            break;
        }
        //データが3個未満の場合は、3回ループしないようにする処理
        else if (i >= temp.length) {
            break;
        }
        var btn = '<img src="./item/delete_mark.png" onclick="removeMemo(' + i + ')">';
        s += '<div class="mycomment"><p>' + temp[i] + '</p>' + btn + '</div>';
    }
    s += '</div>'
    $('disp').innerHTML = s;


}
function Alldisplay() {
    var ans = confirm('今までの発見をすべて表示しますか？')
    if (ans) {
        $('newMemo').value = '';
        var s = '<div class="line-bc">';
        for (var i = 0; i < temp.length; i++) {
            var btn = '<img src="./item/delete_mark.png" onclick="removeMemo(' + i + ')">';
            s += '<div class="mycomment"><p>' + temp[i] + '</p>' + btn + '</div>';
        }

        s += '</div>';
        $('disp').innerHTML = s;
    }
}

function removeMemo(no) {
    var ans = confirm('本当に削除しますか？');
    if (ans) {
        temp.splice(no, 1);
        save();
    }

}

function save() {
    for (var i = 0; i < 10; i++) {
        if (ls[AppName + "dataId" + i]) {
            ls.removeItem(AppName + 'dataId' + i);
        }
    }

    var len = temp.length;

    for (var i = 0; i < len; i++) {
        ls[AppName + 'dataId' + i] = temp[i];
    }
    conversation();
    display();
}

function load() {
    for (var i = 0; i < 10; i++) {
        if (ls[AppName + 'dataId' + i]) {
            temp[i] = ls[AppName + 'dataId' + i];
        }
    }
    display();
}

function clearAllMemo() {
    var ans1 = confirm('今までの発見をすべて置き去りにして逃げますか？');
    if (ans1) {
        var ans2 = confirm('本当によろしいですか？\n\n全部無くなっちゃいますよ？');
        if (ans2) {
            temp.length = 0;
            save();
        }

    }
}

function conversation() {
    var comment = new Array(0);
    comment = [
        'いらっしゃい！ゆっくりしていってくれよ。',
        'ここだけの話、1年間続けられた奴はいないらしいぞ。',
        'おい、なにしてる？さっさと追加せんか！',
        '油売ってる暇があったら外にでも行きな！',
        'いい発見したな！続けてがんばれよ！',
        '今日もお疲れさん。ゆっくりしていってくれよ。',
        'お前さんはスイカの種が無くなってほしいか？よう考えてみろ、あれはスイカの種を飛ばすっていう体験を食べてるんだよ。',
        '明日やろうは馬鹿野郎だ。お前さんは何野郎かな？'];
    var i = Math.floor(Math.random() * comment.length);
    $('says').innerText = comment[i];
    
}

function $(id) {
    return document.getElementById(id);
}


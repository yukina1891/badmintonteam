var total_num;         // 人数の合計
var team_num;          // チームの数
var m_num;             // 男の人数
var w_num;             // 女の人数
var m_mem = [];        // 男メンバー
var w_mem = [];        // 女メンバー
var m_team = [];       // 男チーム
var w_team = [];       // 女チーム
var m_ave;             // 男1人あたりのlevelの平均
var w_ave;             // 女1人あたりのlevelの平均
var m_team_ave = [];   // 男のチームごとの平均
var w_team_ave = [];   // 女のチームごとの平均

function main() {
    total_num = data.length - 1;
    team_num = document.getElementById("teamnum").value;
    for(var i = 0; i < team_num; i++) {
        m_team[i] = [];
        w_team[i] = [];
    }
    divGender();
    sortGrade(m_mem, m_num, m_team);
    sortGrade(w_mem, w_num, w_team);

    updateAve(m_team_ave, m_team);
    updateAve(w_team_ave, w_team);


    var answer = document.getElementById('output');
    answer.innerHTML = w_team_ave;
}

function divGender() {
    m_num = 0;
    w_num = 0;
    m_ave = 0.0;
    w_ave = 0,0;
    for(var i = 0; i < total_num; i++) {
        data[i+1][1] = parseFloat(data[i+1][1]);
        data[i+1][3] = parseFloat(data[i+1][3]);
        if(data[i+1][2] == 0) {
            m_mem[m_num] = data[i+1];
            m_ave += data[i+1][3];
            m_num++;
        } else if(data[i+1][2] == 1) {
            w_mem[w_num] = data[i+1];
            w_ave += data[i+1][3];
            w_num++;
        }
    }
    m_ave = m_ave / m_num;
    w_ave = w_ave / w_num;
}

function sortGrade(mem, num, new_team) {
    var p = 0;
    var q = 0;
    for(var i = 0; i < num; i++) {
        var max = i;
        for(var j = i+1; j < num; j++) {
            if(mem[j][1] > mem[max][1]) max = j;
        }
        var x = mem[i];
        mem[i] = mem[max];
        mem[max] = x;
        new_team[p][q] = mem[i];
        if(p == team_num - 1) {
            p = 0;
            q++;
        } else {
            p++;
        }
    }
}

function updateAve(team_ave, team) {
    for(var i = 0; i < team_num; i++) {
        var total = 0;
        var j = 0;
        while(team[i][j]) {
            total += team[i][j][3];
            j++;
        }
        team_ave[i] = total / j;
    }
}

function checkGrade() {
    
}

function checkAve() {

}

function createTeam() {
    // while() {
    //     if(check()) {

    //     }
    // }
}
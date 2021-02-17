"use strict";

var indiceNominativi = 0;
var indiceInseriti = 0;
var nominativi = [];
var inseriti = [];
var blocco;
var firstClick = false;
var nome, cognome;

(function() {
    // blocco il pulsante per evitare inserimenti sbagliati
    document.getElementById("btnInserisci").setAttribute("disabled", true);
    
    document.getElementById("txtNome").addEventListener("focus", function () {
        // quando uno dei due campi input viene focussato allora il pulsante si sblocca
        document.getElementById("btnInserisci").removeAttribute("disabled");
    });

    // controllo se è stato premuto il pulsante
    document.getElementById("btnInserisci").addEventListener("click", function() {
        nome = document.getElementById("txtNome").value;
        cognome = document.getElementById("txtCognome").value;
    
        if (nome.length >= 2 && cognome.length >= 2) {
            if (checkString(nome) && checkString(cognome)) {
                document.getElementById("triggerModalConferma").click();
            } else {
                document.getElementById("triggerModalErrore").click();
            }
        } else {
            document.getElementById("triggerModalErrore").click();
        }
    
        // pulisco i campi di input
        document.getElementById("txtNome").value = "";
        document.getElementById("txtCognome").value = "";
    
        // tolgo l'attributo disabled per la visualizzazione della list group
        document.getElementById("btnListGroup").removeAttribute("disabled");
    });
    
    document.getElementById("btnAccetta").addEventListener("click", function () {
        // se accetta inserisco il nominativo
        if (verifyFirstChar(nome, cognome)) {
            // se la prima è una vocale allora la aggiungo ai nominativi
            nominativi[indiceNominativi] = nome + " " + cognome;
            indiceNominativi++;
            var div = document.getElementById("div7");
            blocco = document.createElement('p');
            blocco.className = "inseriti";
            blocco.innerHTML = nominativi[indiceNominativi - 1]
            div.appendChild(blocco);
        }

        // salvo il nome e cognome come oggetto
        var daSalvare = {"nome" : nome, "cognome" : cognome};
        inseriti[indiceInseriti] = daSalvare;
        indiceInseriti++;
    });
    
    document.getElementById("btnListGroup").addEventListener("click", function () {
        var list = document.getElementById("list");
        // controllo se è la prima volta che premo il pulsante per vedere la list gruop
        if (firstClick) {
            blocco = document.createElement("li");
            blocco.className = "listElement";
            blocco.innerHTML = inseriti[indiceInseriti - 1].nome + " " + inseriti[indiceInseriti - 1].cognome;
            list.appendChild(blocco);
        } else {
            for (let i = 0; i < inseriti.length; i++) {
                blocco = document.createElement("li");
                blocco.className = "listElement";
                blocco.innerHTML = inseriti[i].nome + " " + inseriti[i].cognome;
                list.appendChild(blocco);
            }
            firstClick = true;
        }
        document.getElementById("list").removeAttribute("hidden");
        document.getElementById("btnListGroup").setAttribute("disabled", true);
    });
})();

function verifyFirstChar(nome, cognome) {
    var vocali = ['A', 'E', 'I', 'O', 'U'];

    for (let i = 0; i < vocali.length; i++) {
        // controllo che la prima lettera sia una vocale
        if (nome[0].toUpperCase() == vocali[i] || cognome[0].toUpperCase() == vocali[i]) {
            return true;
        }
    }
    return false;
}

function checkString() {
    // controlla se tutto il nome/cognome siano senza numeri o caratteri particolari
    for (let i = 0; i < arguments[0].length; i++) {
        let valore = arguments[0].charCodeAt(i);
        if (valore >= 65 && valore <= 122) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
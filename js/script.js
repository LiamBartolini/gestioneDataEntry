"use strict";

var indiceNominativi = 0;
var indiceInseriti = 0;
var isValid;
var vale = false;
var nominativi = [];
var inseriti = [];
var blocco;

jQuery(function () {
    // blocco il pulsante per evitare inserimenti sbagliati
    jQuery("#btnInserisci").prop("disabled", true);
    jQuery("#txtNome , #txtCognome").on("focus", function () {
        jQuery("#btnInserisci").removeAttr("disabled"); // quando uno dei due campi input viene focussato allora il pulsante si sblocca
    });
        // controllo se è stato premuto il pulsante
    jQuery("#btnInserisci").on("click", function() {
        const nome = document.getElementById("txtNome").value;
        const cognome = document.getElementById("txtCognome").value;
        verify(nome, cognome);
        // pulisco i campi di input
        document.getElementById("txtNome").value = "";
        document.getElementById("txtCognome").value = "";
        if (indiceNominativi > 0) {
            if (nominativi[indiceNominativi - 2] != nominativi[indiceNominativi - 1]) {
                blocco = jQuery("<p>" + nominativi[indiceNominativi - 1] + "</p>");
                blocco.addClass("inseriti");
                blocco.appendTo("#div7");
            } else {
                blocco = jQuery("<p>inputError</p>");
                blocco.addClass("inseriti");
                blocco.appendTo("#div7");
            }
        }
        // tolgo l'attributo disabled per la visualizzazione della list group
        jQuery("#btnListGroup").removeAttr("disabled");
    });
    
    
    jQuery("#btnListGroup").on("click", function() {
        if (indiceInseriti != 0) {
            for (let valore of inseriti) {
                blocco = jQuery("<li>" + valore.nome + " " + valore.cognome + "</li>")
                blocco.addClass("listElement");
                blocco.appendTo("#list");
            }
        }
        jQuery("#list").removeAttr("hidden");
        jQuery("#btnListGroup").prop("disabled", true);
    });
});


function verify(nome, cognome) {
    var vocali = ['A', 'E', 'I', 'O', 'U'];

    // controllo se la lunghezza è maggiore di 2
    if (nome.length >= 2 && cognome.length >= 2) {
        // controllo se entrambi i nomi sono validi
        if (checkValue(nome) && checkValue(cognome)) {
            for (let i = 0; i < vocali.length; i++) {
                // controllo che la prima lettera sia una vocale
                if (nome[0].toUpperCase() == vocali[i] || cognome[0].toUpperCase() == vocali[i]) {
                    vale = true;
                    break;
                } else {
                    vale = false;
                }
            }
            // se la prima è una vocale allora la aggiungo ai nominativi
            if (vale) {
                nominativi[indiceNominativi] = nome + " " + cognome;
                indiceNominativi++;
            }
            // creo un oggetto e lo inserisco dentro l'array di oggetti
            var daSalvare = {"nome" : nome, "cognome" : cognome};
            inseriti[indiceInseriti] = daSalvare;
            indiceInseriti++;
        } else {
            activeModalError("il nome <b>'" + arguments[0] + "'</b> contiene un numero!");
        }
    } else {
        // in caso apro un modale che dice del nome troppo corto
        activeModalError("Lunghezza <b>'" + nome + " " + cognome + "'</b> troppo corta");
    }
}

function activeModalError(testo) {
    jQuery("#modal-error-text").html(testo);
    jQuery("#error-modal").modal("toggle");
}

function checkValue() {
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
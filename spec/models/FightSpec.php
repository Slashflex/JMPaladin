<?php
require('./src/models/Fight.php');

// Comment with AAA infos :
// https://wiki.c2.com/?ArrangeActAssert
describe("#isOver", function() {
    it("return true if hero and vilain are alives", function() {
        // Arrange
        $hero = new Personage('Jean-Michel', 100);
        $vilain = new Personage('Vilain', 100);

        // Act
        $fight = new Fight($hero, $vilain);

        // Assert
        expect($fight->isOver())->toBe(false);
    });

    it("return false if hero is dead", function() {
        // Arrange
        $hero = new Personage('Jean-Michel', 100);
        $vilain = new Personage('Vilain', 100);
        $fight = new Fight($hero, $vilain);

        // Act
        $vilain->attack($hero, 100);

        // Assert
        expect($fight->isOver())->toBe(true);
    });

    it("return false if vilain is dead", function() {
        // Arrange
        $hero = new Personage('Jean-Michel', 100);
        $vilain = new Personage('Vilain', 100);
        $fight = new Fight($hero, $vilain);

        // Act
        $hero->attack($vilain, 100);

        // Assert
        expect($fight->isOver())->toBe(true);
    });
});
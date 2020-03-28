new Vue({
  el: '#app',
  data: {
    userHealth: 100,
    monsterHealth: 100,
    isPlaying: false,
    attackHistory: []
  },
  computed: {
    attackEvents: function() {
      return this.attackHistory.slice().reverse();
    }
  },
  methods: {
    startNewGame: function() {
      this.isPlaying = true;
      this.userHealth = 100;
      this.monsterHealth = 100;
      this.attackHistory = [];
    },
    attack: function() {
      if (this.userAttack(this.calculateDamage(3, 10))) {
        this.monsterAttack();
      }
    },
    specialAttack: function() {
      if (this.userAttack(this.calculateDamage(6, 20))) {
        this.monsterAttack();
      }
    },
    heal: function() {
      this.userHealth = this.userHealth > 90 ? 100 : this.userHealth + 10;
      this.attackHistory.push({
        isPlayer: true,
        log: 'Player heals for 10'
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.isPlaying = false;
    },
    userAttack: function(damage) {
      this.monsterHealth -= damage;
      this.attackHistory.push({
        isPlayer: true,
        log: 'Player hits Monster for ' + damage
      });

      if (this.monsterHealth <= 0) {
        if (confirm('You won!!! New game?')) {
          this.startNewGame();
        } else {
          this.isPlaying = false;
        }
        return false;
      } else {
        return true;
      }
    },
    monsterAttack: function() {
      damage = this.calculateDamage(5, 15);
      this.userHealth -= damage;
      this.attackHistory.push({
        isPlayer: false,
        log: 'Monster hits Player for ' + damage
      });

      if (this.userHealth <= 0) {
        if (confirm('You lost!!! New game?')) {
          this.startNewGame();
        } else {
          this.isPlaying = false;
        }
      }
    },
    calculateDamage: function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  }
});

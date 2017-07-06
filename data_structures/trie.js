Trie = function() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
};

insert: function(str, pos) {
    if(str.length == 0) { //blank string cannot be inserted
        return;
    }
    var T = this,
        k,
        child;
    if(pos === undefined) {
        pos = 0;
    }
    if(pos === str.length) {
        T.words ++;
        return;
    }
    T.prefixes ++;
    k = str[pos];
    if(T.children[k] === undefined) { //if node for this char doesn't exist, create one
        T.children[k] = new Trie();
    }
    child = T.children[k];
    child.insert(str, pos + 1);
}

find: function(str) {
    if(str.length == 0) {
        return false;
    }
    if(this.countWord(str) > 0) {
        return true;
    } else {
        return false;
    }
}
const array = {

    uniqueArrayOfObject: (array) => {
        var flags = [], output = [], l = array.length, i;
        for( i=0; i<l; i++) {
            if( flags[array[i].age]) continue;
            flags[array[i].age] = true;
            output.push(array[i].age);
        }

    }

}

module.exports = {
    array
}
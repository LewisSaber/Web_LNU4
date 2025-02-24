class Database {
    constructor(data = {}){
        this.data = data
    }

    addData(data){
        for(const key in data){
            this.data[key] = data[key]
        }
    }

    getData(){
        return this.data
    }

    dropDatabase(){

        this.data = {}
    }
}



class DatabaseProxy{
    constructor(database){
        this.database = database
    }

    addData(data,password){
        if(password == "11111111"){
            this.database.addData(data)
            return {status:"200", data:"data added successfuly"}
        }
        return {status:"403", data:"Access denied"}
    }

    getData(){
        return {status:"200", data:this.database.getData()}
    }

    dropDatabase(password){
        if(password == "11111111"){
            this.database.dropDatabase()
            return {status:"200", data:"data added successfuly"}
        }
        return {status:"403", data:"Access denied"}
    }
}

let log = console.log

function main(){
    let databaseProxy = new DatabaseProxy(new Database())
    log(databaseProxy.addData({"Name":"John", "Surname":"Smith"},"11111111"))
    
    log(databaseProxy.getData())

    log(databaseProxy.addData({"Name":"Illegal"},"000000"))
}
main()
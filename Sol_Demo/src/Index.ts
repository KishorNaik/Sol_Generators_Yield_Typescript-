interface IUserModel{
    firstName:string;
    lastName:string;
    age:number
}

const setUserModel=():Promise<Array<IUserModel>>=>{
    return new Promise((resolve,reject)=>{
        try
        {
            let userModelList=new Array<IUserModel>();
                userModelList.push({
                    firstName:"Kishor",
                    lastName:"naik",
                    age:36
                });
                userModelList.push({
                    firstName:"eshaan",
                    lastName:"naik",
                    age:6
                });

            return resolve(userModelList);
        }
        catch(ex){
            reject(ex);
        }
    })
}

async function* LazyIterate() : AsyncGenerator<IUserModel>{

    let userModelList:Array<IUserModel>=await setUserModel();

    for(let userModel of userModelList){
        yield userModel;
    }
}

const main=async():Promise<void>=>{
    
    let resultLazy=await LazyIterate();

    while(true){

        let nextIterator=await resultLazy?.next();

        if(nextIterator.done===false){

            console.log(`User Model => ${ JSON.stringify(nextIterator?.value)}`);
        }
        else
        {
            break;
        }
    }
}



main()
.then((result)=> console.log(`Complete`))
.catch((ex)=> console.log(ex?.message));
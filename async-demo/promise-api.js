const p = Promise.resolve({id:1});
p.then(result => console.log(result));


const p1 = new Promise((resolve,reject )=> {
    setTimeout(() =>{
      console.log('Asyn operation 1...');
      reject(new Error("Something failed"));
    },2000);
});

const p2 = new Promise(resolve => {
    setTimeout(() =>{
      console.log('Asyn operation 2...');
      resolve(2);
    },2000);
});
// race if one can do first
Promise.all([p1,p2])
 .then(result => console.log(result))
 .catch(err=>console.log(err.message));
const incrementCountNotWorking = (count) => {
  if (count < 0) {
    console.log("count is invalid", count);
    return;
  }
  setTimeout(() => {
    console.log("increment count by database query", ++count, "\n");
  }, 1000);

  return count;
};

// as you can see this code did not behave as expected
let initCount = 2;
const newCount = incrementCountNotWorking(initCount);
console.log(newCount);

const incrementCountPromise = (count) => {
  //TODO: add some code to use promise to do the same functionality and return the count after modification, [2 Marks]
  //TODO: handle invalid data [1 Mark]

  return new Promise((resolve, reject) => {
    if (count < 0) {
      console.log("count is invalid", count);
      reject("count is invalid");
    } else {
      setTimeout(() => {
        console.log("increment count by database query (Promise)", ++count);
        resolve(count);
      }, 1000);
    }
  });
};

//TODO: call incrementCountPromise(initCount) in proper way to console log the returned count after modification  and to catch any errors[1 Mark]
incrementCountPromise(initCount)
  .then((count) => {
    console.log("count after increment", count, "\n");
  })
  .catch((error) => {
    console.log("error", error);
  });

//TODO: How many parameters should this function take
const incrementCountCallBack = (count, onSucess, onError) => {
  //TODO: add some code to use the callBack function to do the same functionality and return the count after modification, [2 Marks]
  //TODO: handle invalid data [1 Mark]
  if (count < 0) {
    onError("count is invalid");
  } else {
    setTimeout(() => {
      console.log("increment count by database query", ++count);
      onSucess(count);
    }, 1000);
  }
};

//TODO: call incrementCountCallBack(?,?,?) in proper way to console log the returned count after modification and to catch any errors  [1 Mark]
incrementCountCallBack(
  initCount,
  (count) => {
    console.log("count after increment", count, "\n");
  },
  (error) => {
    console.log("error", error);
  },
);

const incrementCountAwait = async (count) => {
  //Handle error [1 Mark]
  //[HINT]: use the promise from incrementCountPromise [1 Mark]
  //[NOTE]: you do not have to return any value console log here
  try {
    const newCount = await incrementCountPromise(count);
    console.log("count after increment", newCount, "\n");
  } catch (error) {
    console.log("error", error);
  }
};
incrementCountAwait(initCount);

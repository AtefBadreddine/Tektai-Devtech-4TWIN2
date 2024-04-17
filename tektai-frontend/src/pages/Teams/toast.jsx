import React from 'react'

function PromiseBasedToastExample() {
    const toast = useToast()
    return (
      <Button
        onClick={() => {
          // Create an example promise that resolves in 5s
          const examplePromise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(200), 5000)
          })
  
          // Will display the loading toast until the promise is either resolved
          // or rejected.
          toast.promise(examplePromise, {
            success: { title: 'All good', description: 'Looks great' },
            error: { title: 'Rejected', description: 'Something wrong' },
            loading: { title: 'Processing', description: 'Please wait' },
          })
        }}
      >
        Show Toast
      </Button>
    )
  }
export default PromiseBasedToastExample
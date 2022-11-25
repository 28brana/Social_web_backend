import catchAsync from '../utils/catchAsync';


export const login = catchAsync(async (req, res) => {
    return res.json({
        done: 'e',
    })
})
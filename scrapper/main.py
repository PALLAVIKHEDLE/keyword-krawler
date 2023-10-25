from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/v1/scraping/')
async def root():
    time.sleep(10)
    return {
    "scrapedContent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Neque volutpat ac tincidunt vitae semper quis lectus. Tortor dignissim convallis aenean et tortor at risus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Urna nec tincidunt praesent semper. Fusce id velit ut tortor. Hac habitasse platea dictumst quisque sagittis purus sit amet. Accumsan sit amet nulla facilisi morbi tempus. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet facilisis magna etiam tempor orci eu. Scelerisque purus semper eget duis at tellus at urna. Elit eget gravida cum sociis natoque penatibus et magnis dis. Sed faucibus turpis in eu mi bibendum neque egestas congue. Viverra maecenas accumsan lacus vel facilisis volutpat. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Eget nunc lobortis mattis aliquam faucibus purus in massa. Enim neque volutpat ac tincidunt vitae semper quis. Pharetra convallis posuere morbi leo urna molestie at elementum eu. Amet consectetur adipiscing elit ut aliquam purus sit amet. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Feugiat sed lectus vestibulum mattis ullamcorper velit. Ridiculus mus mauris vitae ultricies leo integer. Mauris ultrices eros in cursus turpis. Turpis egestas pretium aenean pharetra magna ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Eu volutpat odio facilisis mauris sit. Odio eu feugiat pretium nibh ipsum consequat. Nibh tortor id aliquet lectus proin. Sed blandit libero volutpat sed cras ornare arcu. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lectus arcu bibendum at varius vel pharetra. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Aliquam sem fringilla ut morbi tincidunt. Amet dictum sit amet justo donec enim diam. Convallis convallis tellus id interdum velit laoreet id. Malesuada bibendum arcu vitae elementum. Cursus eget nunc scelerisque viverra mauris in aliquam. Ut sem viverra aliquet eget. Dolor sit amet consectetur adipiscing elit. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Penatibus et magnis dis parturient montes nascetur ridiculus. Nec nam aliquam sem et tortor consequat. Tincidunt vitae semper quis lectus. Eget nulla facilisi etiam dignissim. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Ultricies integer quis auctor elit sed. Consequat nisl vel pretium lectus quam id leo in. Vitae turpis massa sed elementum tempus egestas sed sed risus. At lectus urna duis convallis. Donec ac odio tempor orci dapibus ultrices in. Vitae semper quis lectus nulla. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Eu facilisis sed odio morbi quis commodo odio aenean. Nulla porttitor massa id neque. Quam viverra orci sagittis eu volutpat odio facilisis. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Sit amet massa vitae tortor condimentum lacinia quis vel eros. Sit amet massa vitae tortor condimentum. Risus viverra adipiscing at in tellus integer. Ut diam quam nulla porttitor massa id. Justo nec ultrices dui sapien eget mi proin. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Nec ultrices dui sapien eget. Ullamcorper malesuada proin libero nunc consequat interdum varius. Id diam vel quam elementum pulvinar etiam non quam lacus. Volutpat maecenas volutpat blandit aliquam etiam. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Interdum velit euismod in pellentesque massa placerat duis ultricies. Porttitor lacus luctus accumsan tortor posuere ac. Quam lacus suspendisse faucibus interdum. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Eget mi proin sed libero enim sed faucibus turpis. Id consectetur purus ut faucibus pulvinar elementum integer enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Ut etiam sit amet nisl purus in mollis nunc. Sed euismod nisi porta lorem mollis aliquam ut porttitor leo. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Vestibulum sed arcu non odio. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Morbi tristique senectus et netus et malesuada fames."
}


@app.post('/api/v1/keyword/')
async def root():
    time.sleep(4)
    response = {"topKeywordListings": [
            {
            "original": "first",
            "count": 45,
            "recommendation": "FirstRec"
            },
            {
            "original": "second",
            "count": 55,
            "recommendation": "SecondRec"
            },
            {
            "original": "third",
            "count": 56,
            "recommendation": "ThirdRec"
            },
            {
            "original": "four",
            "count": 75,
            "recommendation": "FourthRec"
            },
            {
            "original": "fifth",
            "count": 95,
            "recommendation": "FifthRec"
            },
            {
            "original": "six",
            "count": 82,
            "recommendation": "SixRec"
            },
            {
            "original": "seven",
            "count": 34,
            "recommendation": "SevenRec"
            },
            {
            "original": "eight",
            "count": 23,
            "recommendation": "EightRec"
            },
            {
            "original": "Nine",
            "count": 10,
            "recommendation": "NineRec"
            },
            {
            "original": "Ten",
            "count": 15,
            "recommendation": "TenRec"
            }],
    "alogirthmExecutionTime": 0.893473
    }
    return response
    
    

@app.post('/api/v1/multialgo/')
async def root():
    time.sleep(6)
   
    return {"data": [
        {
            "algoName": "algo1",
            "algoExecutionTime": 0.893473,
            "topKeywordListings": ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth", "fourteenth", "fifteenth"]
        },
        {
            "algoName": "algo2",
            "algoExecutionTime": 0.683473,
            "topKeywordListings": ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth", "fourteenth", "fifteenth"]
        },
        {
            "algoName": "algo3",
            "algoExecutionTime": 0.763473,
            "topKeywordListings": ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth", "fourteenth", "fifteenth"]
        },
        {
            "algoName": "algo4",
            "algoExecutionTime": 0.573473,
            "topKeywordListings": ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth", "fourteenth", "fifteenth"]
        },
        {
            "algoName": "algo5",
            "algoExecutionTime": 0.422373,
            "topKeywordListings": ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth", "fourteenth", "fifteenth"]
        },
    ],
}
 
    


if __name__ == '__main__':
    uvicorn.run("main:app", host='0.0.0.0', port=8000, reload=True)
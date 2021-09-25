
aliyun_registry_bestqa:="registry.cn-shanghai.aliyuncs.com/bestqa"
local_registry:="192.168.0.100:5555"
version:="latest"

build: 
    docker build -t  {{local_registry}}/react_front:{{version}} . 
    docker push {{local_registry}}/react_front:{{version}}
push:
    docker tag  {{local_registry}}/react_front:{{version}} {{aliyun_registry_bestqa}}/react_front:{{version}}
    docker push {{aliyun_registry_bestqa}}/react_front:{{version}}
    curl -vv http://mqtt.bestqa.net:9000/hooks/bestqa_update?token=1235
- 总结博客
  collapsed:: true
	- 串一下最近 ai 向的一些知识，复习 & 知新
		- > 比较综合一点的可以看 https://github.com/phodal/aigc
		- 模型是如何被训练的
		- 微调模型的一些方法
		- 有哪些大模型
			- 不同大模型之间需要关注的点
				- 能力边界
				- case 边界
				- 指令形式
				- 自动化量化
					- 这是啥
			- GPT 3.5-turbo / 4
			- Claude
			- 中文
				- chatGLM
				- 讯飞星火
		- 基于模型有哪些实践
			- 画图
			- 知识库
			- 研发赋能
		- 一些术语
			- lora
				- https://github.com/microsoft/LoRA
			- fine-tune
			- #controlnet
				- 全称 Conditional Generative Adversarial Networks
				- 图像精准控制，是 ai 绘画中的一款插件
				- 个人理解：特定部分的模拟？
				- 一些参考资料
					- https://juejin.cn/post/7210369671656505399
		- 一些实践
			- 声音克隆
		- 一些参考资料
			- https://github.com/f/awesome-chatgpt-prompts
	- 一些科普型的资料
		- [What is a lora or llama? Google gives me nothing.](https://news.ycombinator.com/item?id=35350683)
		- 社区
			- https://www.reddit.com/r/LocalLLaMA/
			- https://zaozaoliao.feishu.cn/wiki/EjVdwm75GiY09tkVlKucq2GUnsf
			-
- 跑模型 & 训练笔记
	- 遇到的问题
		- `ensurepip`
			- 使用 venv 时会遇到一些列问题
				- 通过 `whichpython -m venv venv/ --without-pip` 先创建 venv 后再[手动安装](https://pip.pypa.io/en/stable/installation/#get-pip-py)
				- ```shell
				  python3.10 -m venv venv/ --without-pip
				  source venv/bin/activate
				  wget https://bootstrap.pypa.io/get-pip.py
				  python get-pip.py
				  source venv/bin/activate
				  pip -V
				  ```
	- 查看显卡信息
	  collapsed:: true
		- `lspci | grep -i nvidia`
		- ```shell
		  nvidia-smi 
		  Mon Jul 24 15:37:07 2023       
		  +-----------------------------------------------------------------------------+
		  | NVIDIA-SMI 520.61.05    Driver Version: 520.61.05    CUDA Version: 11.8     |
		  |-------------------------------+----------------------+----------------------+
		  | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
		  | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
		  |                               |                      |               MIG M. |
		  |===============================+======================+======================|
		  |   0  Tesla P40           Off  | 00000000:AF:00.0 Off |                    0 |
		  | N/A   28C    P8     9W / 250W |      9MiB / 23040MiB |      0%      Default |
		  |                               |                      |                  N/A |
		  +-------------------------------+----------------------+----------------------+
		                                                                                 
		  +-----------------------------------------------------------------------------+
		  | Processes:                                                                  |
		  |  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
		  |        ID   ID                                                   Usage      |
		  |=============================================================================|
		  |    0   N/A  N/A      2113      G   /usr/lib/xorg/Xorg                  4MiB |
		  |    0   N/A  N/A      7618      G   /usr/lib/xorg/Xorg                  4MiB |
		  +-----------------------------------------------------------------------------+
		  ```
	- 验证 `CUDA`
		- ```shell
		  nvcc --version
		  nvcc: NVIDIA (R) Cuda compiler driver
		  Copyright (c) 2005-2022 NVIDIA Corporation
		  Built on Wed_Sep_21_10:33:58_PDT_2022
		  Cuda compilation tools, release 11.8, V11.8.89
		  Build cuda_11.8.r11.8/compiler.31833905_0
		  ```
	- model-parallel (MP)
		- https://huggingface.co/docs/transformers/v4.15.0/parallelism
		- 数据并行是指，多张 GPUs 使用相同的模型副本，但采用不同 batch 的数据进行训练.
		- 模型并行是指，多张 GPUs 使用同一 batch 的数据，分别训练模型的不同部分.
		- 讲的比较详细的资料：[PyTorch使用多GPU并行训练及其原理和注意事项](https://blog.csdn.net/weixin_44878336/article/details/125412625)
	- model cards 是什么
		- https://huggingface.co/docs/hub/model-cards
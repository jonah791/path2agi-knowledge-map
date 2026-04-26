---
title: 进化生物学
aliases:
  - Evolutionary Biology
category:
  - 认知、生物与语言
tags:
  - ai-foundations
  - biology
  - evolutionary-biology
type: topic
status: stable
importance: important
version: v2.1
date: '2026-04-08'
---

# 进化生物学（Evolutionary Biology）：从起源到 AI 的完整脉络

> **上帝视角**：进化生物学为 AI 提供了一类重要的黑箱搜索与无梯度优化思路，但它并不是梯度学习的普遍替代品。遗传算法、进化策略、神经进化和 NAS 等方法，最擅长处理不可微、离散、结构搜索或高噪声目标；而在大规模可微参数学习上，梯度方法通常仍更高效。理解进化生物学，关键是理解它在哪些问题上特别强、又在哪些问题上不该被神化。

---

## 相关主题

- [[03-calculus-and-optimization|微积分与最优化]]：梯度下降定义了主流深度学习优化路径，进化方法则提供了黑箱替代
- [[12-game-theory|博弈论]]：进化博弈与多智能体适应过程天然相连
- [[16-complexity-science|复杂性科学]]：进化、多样性、涌现与开放式搜索共同构成复杂适应系统视角
- [[17-statistical-physics|统计物理]]：适应度景观与能量景观存在结构类比，但两者并非可无条件互换
- [[19-neuroscience|神经科学]]：神经进化与神经达尔文主义把生物适应和神经表征联系起来

---

## 1. 上帝视角：为什么 AI 需要进化生物学

### 1.1 核心价值：无梯度优化

深度学习的成功建立在梯度下降之上，但梯度下降并不能覆盖全部搜索问题。尤其在以下场景中，它会遇到明显限制：

- **目标函数不可微**：离散结构（网络拓扑、超参数组合）无法求导
- **梯度消失/爆炸**：极深网络或长序列中梯度信号退化
- **局部最优陷阱**：高维非凸景观中梯度方法容易困在鞍点或局部极小

进化生物学提供了一套完全不同的优化范式：**只需要评估适应度（fitness），不需要计算梯度**。这使得进化方法可以优化黑箱、不可微、不连续、甚至带噪声的目标函数。

### 1.2 与其他学科的关键连接

| 学科 | 连接点 | 具体体现 |
|------|--------|----------|
| 博弈论（Game Theory） | 进化博弈论 | Maynard Smith 的进化稳定策略（ESS） |
| 复杂性科学（Complexity Science） | 涌现与自组织 | 简单规则产生复杂适应行为 |
| 优化理论（Optimization） | 元启发式搜索 | 遗传算法作为全局优化器 |
| 信息论（Information Theory） | 遗传信息编码 | 基因型-表现型映射的信息瓶颈 |
| 统计力学（Statistical Mechanics） | 适应度景观理论 | 能量景观与适应度景观的结构类比 |
| 神经科学（Neuroscience） | 神经达尔文主义 | Edelman 的神经元群选择理论 |
| 控制论（Cybernetics） | 自适应系统 | 进化作为无监督的控制策略 |

### 1.3 进化计算的独特优势

- **天然并行**：种群中的个体可以同时评估
- **全局搜索能力**：通过种群多样性避免局部最优
- **无需领域知识**：只需定义适应度函数
- **可处理多目标**：Pareto 前沿天然适合进化框架

但边界同样重要：当目标函数可微、参数规模极大、且每次评估成本极高时，进化方法往往不如梯度方法高效。它最有价值的地方，通常是**搜索结构、策略、超参数与黑箱目标**，而不是取代整个深度学习训练范式。

### 1.4 一个判断框架：什么时候该用进化方法

可以把“要不要上进化方法”理解成一个工程分流问题：

- **情景 A：训练一个可微的大语言模型或视觉模型**。损失函数明确、反向传播稳定、参数规模巨大。这时主角几乎总是梯度下降，进化方法若介入，也通常只放在外层做提示词、结构或超参数搜索。
- **情景 B：搜索网络结构、机器人控制策略或带硬约束的黑箱目标**。如果奖励稀疏、评估带噪声、甚至动作本身是离散结构，进化方法往往更自然，因为它不要求可导。
- **情景 C：想要的不只是一个最优解，而是一组多样化可用解**。例如生成多个不同风格的策略、控制器或架构候选，这时质量多样性（quality-diversity）和开放式进化比单点优化更合适。

简化成一句话：**能稳定求梯度时，优先用梯度；不能稳定求梯度、或者真正要搜索的是结构与策略空间时，再优先进化方法。**

---

## 2. 历史脉络

### 2.1 生物学基础（1859—1960s）

**Charles Darwin (1859)**：《物种起源》提出自然选择理论。核心思想：
- 种群中存在个体变异（variation）
- 变异可遗传（heredity）
- 资源有限导致生存竞争（struggle for existence）
- 适应环境的个体更可能存活和繁殖（survival of the fittest）

**Gregor Mendel (1866)**：发现遗传的离散性——基因（gene）。遗传不是"混合"，而是离散单元的组合。这为后来遗传算法中的离散编码提供了生物学基础。

**Ronald Fisher (1930)**：《自然选择的遗传理论》（The Genetical Theory of Natural Selection）。Fisher 将达尔文的定性理论数学化，创立群体遗传学（population genetics）。Fisher 基本定理：

$$\frac{d\bar{w}}{dt} = \text{Var}(w)$$

种群平均适应度的增长率等于适应度的方差。这意味着：**只要种群中存在多样性，进化就会持续改进**。

**Sewall Wright (1932)**：提出适应度景观（fitness landscape）概念。将进化想象为种群在高维景观上的运动，山峰代表高适应度，山谷代表低适应度。这个隐喻深刻影响了后来的优化理论。

### 2.2 进化计算的诞生（1960s—1970s）

**Lawrence Fogel (1966)**：进化编程（Evolutionary Programming）。Fogel 用有限状态机表示个体，通过变异和选择来进化预测算法。这是最早将进化思想应用于计算的尝试之一。

**Ingo Rechenberg (1965, 1973)**：进化策略（Evolution Strategies, ES）。在柏林工业大学，Rechenberg 用进化方法优化流体力学中的喷嘴形状。他提出了 (1+1)-ES：单个父代产生单个后代，保留更优者。后来扩展为 (μ+λ)-ES 和 (μ,λ)-ES。

**Hans-Paul Schwefel (1977)**：进一步发展进化策略，引入自适应变异步长（self-adaptive mutation step sizes）。这是一个关键创新：**让进化过程自己学习如何进化**。

**John Holland (1975)**：《自然与人工系统中的适应》（Adaptation in Natural and Artificial Systems）。Holland 正式提出遗传算法（Genetic Algorithm, GA），建立了完整的理论框架：
- 二进制编码的基因型
- 选择、交叉、变异三个算子
- 模式定理（Schema Theorem）：短的、低阶的、高适应度的模式会指数增长

### 2.3 成熟与扩展（1980s—1990s）

**David Goldberg (1989)**：《搜索、优化与机器学习中的遗传算法》。这本教科书使遗传算法广泛普及，推动了大量工程应用。

**John Koza (1992)**：遗传编程（Genetic Programming, GP）。Koza 将进化的对象从固定长度的字符串扩展到树形结构的计算机程序。个体不再是"解"，而是"生成解的程序"。这是自动编程的早期尝试。

**Kalyanmoy Deb (2002)**：NSGA-II（Non-dominated Sorting Genetic Algorithm II）。多目标进化优化的里程碑算法，引入快速非支配排序和拥挤距离，成为多目标优化的标准基准。

### 2.4 与深度学习的融合（2010s—至今）

**Nikolaus Hansen (2001, 2016)**：CMA-ES（Covariance Matrix Adaptation Evolution Strategy）。通过自适应协方差矩阵来引导搜索方向，被认为是连续优化中最强大的无梯度方法之一。

**Real et al. (2019)**：大规模进化神经架构搜索。Google Brain 团队用进化方法在 ImageNet 上搜索网络架构，结果与人工设计的 AmoebaNet 和强化学习搜索的 NASNet 相当。

**OpenAI (2017)**：Evolution Strategies as a Scalable Alternative to Reinforcement Learning。Salimans 等人证明简单的进化策略可以在 Atari 游戏和 MuJoCo 控制任务上与深度强化学习竞争，且天然支持大规模并行。

**Kenneth Stanley (2017—2019)**：提出新颖性搜索（Novelty Search）和质量多样性（Quality-Diversity）算法，挑战"只优化目标函数"的传统范式，强调探索和多样性的价值。

---

## 3. 核心知识点详解

### 3.1 自然选择与适应度景观

#### 生物机制

自然选择的核心逻辑可以用三个条件概括（Lewontin, 1970）：

1. **变异**（Variation）：种群中个体之间存在差异
2. **遗传**（Heredity）：这些差异至少部分可遗传
3. **差异繁殖**（Differential Reproduction）：不同特征导致不同的繁殖成功率

满足这三个条件，进化就必然发生。这是一个算法性的描述——它不依赖于具体的物质基础（DNA、蛋白质），而是一个抽象的信息处理过程。

#### 数学化表述

适应度景观 f 是从基因型空间到实数的映射。进化可以看作种群在这个景观上的随机搜索：

$$P_{t+1}(g) \propto f(g) \cdot P_t(g)$$

其中 $P_t(g)$ 是第 $t$ 代基因型 $g$ 的频率。选择使高适应度的基因型频率增加，变异引入新的基因型，交叉重组已有的基因型。

NK 模型（Kauffman, 1993）提供了一个可调节的适应度景观：
- $N$：基因位点数
- $K$：每个位点与其他位点的相互作用数
- $K=0$ 时景观光滑，只有一个全局最优（Mt. Fuji 景观）
- $K=N-1$ 时景观完全随机（随机景观）

#### 直觉理解

适应度景观像一张崎岖地形图。进化并不知道“山顶在哪”，只能依赖局部变异和筛选一点点向上爬；而地形是否平滑、是否充满局部峰值，决定了搜索会不会卡住。

#### AI 中的角色

适应度景观常被拿来类比优化中的损失景观（loss landscape）。这种类比有助于理解局部峰值、多样性保持与搜索停滞，但两者的动力学、采样方式和更新规则并不相同。

### 3.2 遗传算法（Genetic Algorithm, GA）

#### 生物机制

遗传算法直接模拟有性生殖的核心机制：
- **基因型编码**：生物体的遗传信息存储在 DNA 序列中，由四种碱基（A, T, G, C）组成
- **交叉重组**（Crossover）：减数分裂时同源染色体交换片段，产生新的基因组合
- **点突变**（Point Mutation）：DNA 复制时碱基替换，引入全新的遗传变异
- **自然选择**：环境压力淘汰低适应度个体，保留高适应度个体

#### 数学化表述

标准遗传算法的流程：

1. **初始化**：随机生成种群 $P_0 = \{x_1, x_2, \ldots, x_N\}$
2. **评估**：计算每个个体的适应度 $f(x_i)$
3. **选择**：按适应度比例选择父代（轮盘赌选择）：
   $$p(x_i) = \frac{f(x_i)}{\sum_{j=1}^{N} f(x_j)}$$
4. **交叉**：以概率 $p_c$ 对父代进行交叉操作
5. **变异**：以概率 $p_m$ 对后代进行变异操作
6. **替换**：新种群替换旧种群
7. 重复步骤 2-6 直到终止条件

**模式定理**（Schema Theorem, Holland 1975）：

设模式 $H$ 的阶为 $o(H)$（确定位数），定义长度为 $\delta(H)$（最远两个确定位之间的距离），则：

$$E[m(H, t+1)] \geq m(H, t) \cdot \frac{f(H)}{\bar{f}} \cdot \left[1 - p_c \cdot \frac{\delta(H)}{l-1}\right] \cdot (1 - p_m)^{o(H)}$$

其中 $m(H,t)$ 是第 $t$ 代中匹配模式 $H$ 的个体数，$f(H)$ 是这些个体的平均适应度，$\bar{f}$ 是种群平均适应度。

含义：**短的、低阶的、高于平均适应度的模式会指数增长**。这被称为"积木块假说"（Building Block Hypothesis）。

#### 常用算子

**选择算子**：
- 轮盘赌选择（Roulette Wheel Selection）：按适应度比例选择
- 锦标赛选择（Tournament Selection）：随机取 k 个个体，选最优者。选择压力可通过 k 调节
- 精英保留（Elitism）：直接保留最优个体到下一代

**交叉算子**：
- 单点交叉（Single-point Crossover）：随机选一个切点，交换两段
- 两点交叉（Two-point Crossover）：选两个切点，交换中间段
- 均匀交叉（Uniform Crossover）：每个位点独立地以 50% 概率交换
- 顺序交叉（Order Crossover, OX）：用于排列编码（如 TSP 问题）

**变异算子**：
- 位翻转（Bit Flip）：二进制编码中翻转某一位
- 高斯变异（Gaussian Mutation）：实数编码中加高斯噪声
- 交换变异（Swap Mutation）：排列编码中交换两个位置

#### 直觉理解

遗传算法的直觉是“不要只优化一个候选解，而是维持一个会繁殖、会突变的解群体”。交叉负责重组已有好片段，突变负责把搜索带向尚未覆盖的区域。

#### AI 中的角色

- **超参数优化**：搜索学习率、批大小、网络层数等离散/连续超参数
- **特征选择**：用二进制编码表示特征子集，进化选择最优特征组合
- **组合优化**：TSP、调度问题、背包问题等 NP-hard 问题
- **游戏 AI**：进化游戏策略和行为规则

### 3.3 进化策略（Evolution Strategies, ES）

#### 生物机制

进化策略更侧重于表现型（phenotype）层面的变异，而非基因型层面。在自然界中，许多性状是连续变化的（身高、体重、代谢速率），这些性状受多基因控制，表现为连续分布。进化策略直接在连续实数空间中操作，更适合连续优化问题。

#### 数学化表述

**(μ, λ)-ES**：$\mu$ 个父代产生 $\lambda$ 个后代（$\lambda > \mu$），从后代中选择最优的 $\mu$ 个作为下一代父代。注意：父代不参与选择，这提供了更强的选择压力。

**(μ + λ)-ES**：$\mu$ 个父代产生 $\lambda$ 个后代，从父代和后代的并集中选择最优的 $\mu$ 个。父代可以存活到下一代，这是精英策略。

基本的 (μ, λ)-ES 更新规则：

1. 从 μ 个父代中采样 λ 个后代：
   $$x_i^{(t+1)} = x_{\text{parent}} + \sigma \cdot \mathcal{N}(0, I), \quad i = 1, \ldots, \lambda$$
2. 评估所有后代的适应度 $f(x_i^{(t+1)})$
3. 选择最优的 $\mu$ 个后代作为新的父代
4. 更新变异步长 $\sigma$（自适应）

**1/5 成功规则**（Rechenberg）：如果成功变异（后代优于父代）的比例大于 1/5，增大 $\sigma$；如果小于 1/5，减小 $\sigma$：

$$\sigma^{(t+1)} = \begin{cases} \sigma^{(t)} \cdot c_d & \text{如果成功率} > 1/5 \\ \sigma^{(t)} / c_d & \text{如果成功率} < 1/5 \\ \sigma^{(t)} & \text{如果成功率} = 1/5 \end{cases}$$

其中 $c_d \approx 0.817$。

**CMA-ES**（Hansen & Ostermeier, 2001）是进化策略的巅峰之作。它不仅自适应步长，还自适应搜索方向：

$$x_i^{(t+1)} \sim \mathcal{N}\left(m^{(t)}, (\sigma^{(t)})^2 C^{(t)}\right)$$

其中 $m^{(t)}$ 是分布均值，$C^{(t)}$ 是协方差矩阵。CMA-ES 通过累积路径（evolution path）来更新协方差矩阵，能够学习变量之间的相关性，在旋转不变的意义下是最优的。

#### 直觉理解

进化策略不是在一堆离散编码上翻牌，而是在连续空间里不断调整“搜索分布”。步长告诉你该迈多大步，协方差则告诉你哪些方向值得联动探索。

#### AI 中的角色

- **强化学习的替代方案**：OpenAI (2017) 证明 ES 可以在 Atari 和 MuJoCo 上与策略梯度方法竞争
- **神经网络权重优化**：直接用 ES 优化网络参数，避免反向传播
- **黑箱优化**：当目标函数不可微或梯度不可靠时，CMA-ES 是首选
- **机器人控制**：进化机器人的运动策略和形态

### 3.4 遗传编程（Genetic Programming, GP）

#### 生物机制

如果说遗传算法进化的是"参数"，遗传编程进化的是"结构"。在生物学中，基因不仅编码蛋白质的序列，还通过调控网络控制基因的表达模式。基因调控网络本身就是一种"程序"——它根据输入信号（环境条件）产生输出响应（蛋白质表达）。

#### 数学化表述

遗传编程中，个体是树形结构的程序：
- **函数集** $F = \{+, -, \times, \div, \sin, \cos, \text{if}, \ldots\}$
- **终端集** $T = \{x, y, z, 0, 1, 2, \ldots\}$

交叉操作：随机选择两棵树的子树并交换。
变异操作：随机选择一个子树并替换为随机生成的新子树。

适应度通常定义为程序在训练数据上的误差：

$$f(\text{program}) = -\sum_{i=1}^{n} \left(\text{program}(x_i) - y_i\right)^2$$

其中：
- $\text{program}(x_i)$ 表示候选程序在输入 $x_i$ 上的输出
- $y_i$ 表示训练数据中的目标值
- $n$ 表示训练样本数量
- 负号表示误差越小，适应度越高

#### 直觉理解

遗传编程的搜索对象不再是参数，而是“程序树本身”。它像在进化一门小型语言：好的子树会被保留和重组，差的结构则被淘汰。

#### AI 中的角色

- **符号回归**（Symbolic Regression）：从数据中发现数学公式，如 Eureqa 系统
- **自动特征工程**：进化生成新的特征表达式
- **程序合成**：自动生成满足规约的程序
- **可解释 AI**：进化出的公式比神经网络更可解释

### 3.5 神经架构搜索（Neural Architecture Search, NAS）

#### 生物机制

在自然界中，进化不仅优化个体的"参数"（如体型大小），还优化"架构"（如身体结构、器官布局）。寒武纪大爆发（约 5.4 亿年前）在短短几千万年内产生了几乎所有现代动物门类的基本体型（body plan），这是进化在"架构空间"中的一次大规模探索。

NAS 将同样的思想应用于神经网络：不再由人类专家手工设计网络结构，而是让算法自动搜索最优架构。

#### 数学化表述

NAS 问题可以形式化为：

$$a^* = \arg\max_{a \in \mathcal{A}} \text{Acc}_{\text{val}}(\text{train}(a, D_{\text{train}}))$$

其中 A 是架构搜索空间，a 是一个具体架构，训练后在验证集上评估准确率。

**进化 NAS 的流程**：

1. 初始化种群：随机生成一组网络架构
2. 训练并评估每个架构（这是计算瓶颈）
3. 选择高适应度的架构作为父代
4. 通过变异（添加/删除层、改变连接、修改超参数）产生后代
5. 重复直到找到满意的架构

**关键工作**：

- **NASNet**（Zoph & Le, 2017）：用强化学习搜索，消耗 500 GPU 天
- **AmoebaNet**（Real et al., 2019）：用进化方法搜索，性能与 NASNet 相当，且发现了更多样的架构
- **DARTS**（Liu et al., 2019）：将离散搜索空间松弛为连续空间，用梯度下降搜索，大幅降低计算成本
- **EfficientNet**（Tan & Le, 2019）：结合 NAS 和复合缩放，在效率-精度权衡上达到新的 Pareto 前沿

#### 直觉理解

NAS 的核心不是手工决定“卷积层该怎么堆”，而是把网络结构本身变成可搜索对象。这样系统就能像生物进化体型一样，在架构空间里寻找更合适的设计。

#### AI 中的角色

- **图像分类**：自动设计 CNN 架构，在部分搜索空间中达到或接近当时手工设计水平
- **目标检测**：NAS-FPN 自动搜索特征金字塔网络结构
- **语言模型**：Evolved Transformer（So et al., 2019）用进化搜索 Transformer 变体
- **边缘部署**：搜索满足延迟/内存约束的轻量架构（MnasNet）

### 3.6 Baldwin 效应与元学习

#### 生物机制

**Baldwin 效应**（James Mark Baldwin, 1896）描述了学习与进化之间的微妙交互：

1. 个体在其生命周期内通过学习获得某种适应性行为
2. 能够更快学会这种行为的个体具有选择优势
3. 经过多代选择，种群逐渐进化出更容易学习该行为的先天倾向
4. 最终，原本需要学习的行为可能变成先天的本能

关键洞察：**学习不改变基因，但学习能力本身是可进化的**。学习"平滑"了适应度景观，使得原本不可达的适应度峰变得可达。

#### 数学化表述

设基因型为 $g$，学习后的表现型为 $\phi(g)$（$\phi$ 是学习过程），适应度为 $f$。

- 无学习时的适应度：$f(g)$
- 有学习时的适应度：$f(\phi(g))$

Baldwin 效应意味着：学习会把原本尖锐的适应度景观“抹平”一部分，使进化更容易沿着可学习区域前进。

Hinton & Nowlan (1987) 用一个经典实验验证了这一点：在一个"针尖"适应度景观中（只有一个正确的二进制串），纯进化几乎不可能找到解，但加入学习后，进化可以逐步逼近。

#### AI 中的应用：元学习

Baldwin 效应直接启发了元学习（meta-learning）的核心思想：**学习如何学习**。

- **MAML**（Model-Agnostic Meta-Learning, Finn et al., 2017）：学习一个好的初始化参数，使得在新任务上只需少量梯度步就能快速适应。这正是 Baldwin 效应的计算实现——进化（外层优化）找到一个容易学习的起点，学习（内层优化）完成具体任务的适应。

$$\theta^* = \arg\min_\theta \sum_{\mathcal{T}_i} \mathcal{L}_{\mathcal{T}_i}\left(\theta - \alpha \nabla_\theta \mathcal{L}_{\mathcal{T}_i}(\theta)\right)$$

其中：
- $\theta$ 表示元学习共享的初始化参数
- $\mathcal{T}_i$ 表示第 $i$ 个任务
- $\alpha$ 表示任务内快速适应的学习率
- $\mathcal{L}_{\mathcal{T}_i}$ 表示任务对应的损失函数

- **进化元学习**：用进化算法优化元学习的超参数（学习率、网络结构、损失函数）
- **Lamarckian vs Baldwinian 进化**：在进化计算中，是否将学习结果写回基因型是一个重要的设计选择

#### 直觉理解

Baldwin 效应告诉我们，进化不必直接“写死”所有能力，它也可以进化出一种更容易学习新任务的起点。元学习正是把这种思想转成现代优化框架。

#### AI 中的角色

- **少样本适应**：让模型在少量样本下快速迁移到新任务
- **初始化学习**：外层优化寻找“容易学”的参数起点
- **学习策略进化**：把学习率、结构和更新规则本身也纳入搜索

---

## 4. 对 AI 的核心贡献

进化生物学对 AI 的真正影响，主要是通过**进化计算这类工程化方法**进入系统设计，而不是把自然进化逐字翻译成算法。下面几类贡献中，前两类最成熟，后三类更偏探索与扩展。

### 4.1 无梯度优化范式

进化计算为 AI 提供了一套完整的无梯度优化工具箱。在以下场景中，进化方法具有不可替代的优势：

| 场景 | 为什么梯度方法失效 | 进化方法的解决方案 |
|------|-------------------|-------------------|
| 离散搜索空间 | 无法定义梯度 | 直接在离散空间中操作 |
| 不可微目标函数 | 梯度不存在 | 只需评估适应度值 |
| 多模态景观 | 梯度下降困在局部最优 | 种群多样性维持全局搜索 |
| 多目标优化 | 单一梯度方向无法平衡多个目标 | Pareto 前沿天然适合种群方法 |
| 噪声目标函数 | 梯度估计不准确 | 种群统计量对噪声鲁棒 |
| 延迟奖励 | 信用分配困难 | 整体评估个体的终身表现 |

边界也必须写清楚：如果问题已经有稳定梯度、数据充分、模型巨大且评估代价极高，那么进化方法通常不是首选；它们更适合做“外层搜索器”，而不是替代内层的大规模参数学习。

### 4.2 自动化机器学习（AutoML）

进化方法是 AutoML 的核心引擎之一：

- **超参数优化**：进化搜索学习率、正则化系数、批大小等
- **特征工程**：进化生成和选择特征
- **模型选择**：进化选择算法类型和组合方式
- **架构搜索**：进化设计网络拓扑（NAS）
- **数据增强策略**：AutoAugment 用搜索方法发现最优数据增强策略

### 4.3 多样性搜索、开放式进化与创造力

传统优化追求单一最优解，但进化的真正力量在于**持续产生新颖性**：

- **新颖性搜索**（Novelty Search, Lehman & Stanley, 2011）：不优化目标函数，而是奖励行为的新颖性。在欺骗性问题（deceptive problem）中，新颖性搜索反而比目标导向搜索更快找到解。

- **质量多样性**（Quality-Diversity, QD）：同时优化质量和多样性。MAP-Elites 算法（Mouret & Clune, 2015）维护一个行为空间的网格，每个格子保留该行为区域中最优的个体。

- **开放式进化**（Open-ended Evolution）：模拟自然进化中持续产生复杂性的能力。这是探索 AGI 的一种研究方向，但目前仍更接近实验性框架，而非成熟工程路线。

### 4.4 协同进化与多智能体系统

生物界的军备竞赛（arms race）——捕食者与猎物、寄生虫与宿主——驱动了持续的适应和创新。在 AI 中：

- **竞争性协同进化**：两个种群互为对手，互相驱动进化（如 GAN 的对抗训练可以看作一种协同进化）
- **合作性协同进化**：将复杂问题分解为子问题，不同种群分别进化子解，组合评估
- **多智能体进化**：在多智能体环境中进化通信协议和合作策略

### 4.5 神经进化（Neuroevolution）

直接用进化方法优化神经网络：

- **NEAT**（NeuroEvolution of Augmenting Topologies, Stanley & Miikkulainen, 2002）：同时进化网络的权重和拓扑结构。通过历史标记（innovation number）解决交叉时的结构对齐问题。

- **HyperNEAT**（Stanley et al., 2009）：用间接编码（CPPN）生成大规模网络的连接模式，利用几何规律性来压缩搜索空间。

- **Weight Agnostic Neural Networks**（Gaier & Ha, 2019）：搜索不依赖特定权重值就能工作的网络拓扑，揭示了架构本身蕴含的归纳偏置。

---

## 5. 前沿与开放问题

### 5.1 可扩展性挑战

进化方法的主要瓶颈是适应度评估的计算成本。对于深度学习模型，训练一个个体可能需要数小时甚至数天。解决方案包括：

- **代理模型**（Surrogate Model）：用廉价的近似模型预测适应度，减少昂贵的真实评估
- **权重共享**（Weight Sharing）：NAS 中让不同架构共享权重，避免从头训练
- **早停策略**（Early Stopping）：根据早期训练曲线预测最终性能，提前淘汰差的个体
- **分布式进化**：利用大规模并行计算加速种群评估

### 5.2 进化与学习的深度融合

Baldwin 效应只是冰山一角。更深层的问题是：

- **进化能否发现梯度下降？** 如果我们进化学习算法本身，会得到什么？
- **内在动机的进化起源**：好奇心、探索欲望是否可以通过进化产生？
- **可塑性的进化**：大脑的学习能力本身是进化的产物，如何在 AI 中复现？

### 5.3 开放式智能

最雄心勃勃的目标：创建一个能够像自然进化一样持续产生越来越复杂的智能体的系统。

- **最小复杂性标准**（Minimal Criterion）：什么条件下进化系统会持续产生新颖性而不停滞？
- **重大进化转变**（Major Evolutionary Transitions）：从单细胞到多细胞、从个体到社会，这些质变如何在计算系统中实现？
- **进化的进化**（Evolution of Evolvability）：进化过程本身也在进化——基因调控网络、有性生殖、发育过程都增强了进化的能力

### 5.4 与大语言模型的结合

最新的研究方向多处于“外层搜索”阶段：

- **EvoPrompting**（Chen et al., 2023）：用进化方法优化大语言模型的提示词
- **进化式代码生成**：用 LLM 作为变异算子，进化生成代码
- **LLM 辅助的适应度景观分析**：用语言模型理解和预测进化动态

---

## 6. 推荐阅读与参考文献

### 经典著作

- Darwin, C. (1859). *On the Origin of Species*. John Murray.
- Fisher, R. A. (1930). *The Genetical Theory of Natural Selection*. Clarendon Press.
- Holland, J. H. (1975). *Adaptation in Natural and Artificial Systems*. University of Michigan Press.
- Goldberg, D. E. (1989). *Genetic Algorithms in Search, Optimization, and Machine Learning*. Addison-Wesley.
- Koza, J. R. (1992). *Genetic Programming: On the Programming of Computers by Means of Natural Selection*. MIT Press.

### 重要论文

- Rechenberg, I. (1973). *Evolutionsstrategie: Optimierung technischer Systeme nach Prinzipien der biologischen Evolution*. Frommann-Holzboog.
- Schwefel, H.-P. (1977). *Numerische Optimierung von Computer-Modellen mittels der Evolutionsstrategie*. Birkhauser.
- Hinton, G. E. & Nowlan, S. J. (1987). How learning can guide evolution. *Complex Systems*, 1(3), 495-502.
- Hansen, N. & Ostermeier, A. (2001). Completely derandomized self-adaptation in evolution strategies. *Evolutionary Computation*, 9(2), 159-195.
- Stanley, K. O. & Miikkulainen, R. (2002). Evolving neural networks through augmenting topologies. *Evolutionary Computation*, 10(2), 99-127.
- Deb, K. et al. (2002). A fast and elitist multiobjective genetic algorithm: NSGA-II. *IEEE Transactions on Evolutionary Computation*, 6(2), 182-197.
- Lehman, J. & Stanley, K. O. (2011). Abandoning objectives: Evolution through the search for novelty alone. *Evolutionary Computation*, 19(2), 189-223.
- Salimans, T. et al. (2017). Evolution strategies as a scalable alternative to reinforcement learning. *arXiv:1703.03864*.
- Real, E. et al. (2019). Regularized evolution for image classifier architecture search. *AAAI*.
- Finn, C. et al. (2017). Model-agnostic meta-learning for fast adaptation of deep networks. *ICML*.

### 综述与教材

- Eiben, A. E. & Smith, J. E. (2015). *Introduction to Evolutionary Computing*. 2nd ed. Springer.
- De Jong, K. A. (2006). *Evolutionary Computation: A Unified Approach*. MIT Press.
- Stanley, K. O. et al. (2019). Designing neural networks through neuroevolution. *Nature Machine Intelligence*, 1(1), 24-35.

### 在线资源

- CMA-ES 官方教程：https://cma-es.github.io/
- OpenAI Evolution Strategies 博客：https://openai.com/blog/evolution-strategies/
- NEAT 算法主页：http://nn.cs.utexas.edu/keyword?stanley:ec02

---

## 7. 本篇在全书中的位置

本篇介绍进化生物学如何为 AI 提供**黑箱搜索、结构优化、多目标权衡与开放式探索**的思想来源。它不是主流深度学习训练的主引擎，却是很多“难以求导的问题”进入 AI 系统设计时的重要替代路线。

**与相邻篇章的关系**：
- 与[[03-calculus-and-optimization|微积分与最优化]]形成对照：前者主讲梯度方法，本文主讲无梯度与黑箱搜索
- 与[[16-complexity-science|复杂性科学]]相连：多样性保持、涌现与开放式进化都属于复杂适应系统问题
- 与 [[12-game-theory|博弈论]] 相连：协同进化、多智能体对抗与进化稳定策略共享问题结构
- 与[[17-statistical-physics|统计物理]]相连：景观与搜索过程可借用统计物理视角解释，但不应把类比误写成严格同构

**贡献边界**：
进化方法最擅长处理结构搜索、不可微目标、多目标优化与高噪声黑箱问题；它们并不自动优于梯度方法，也很少单独承担今天大模型的主体训练成本。更准确的理解是：进化生物学为 AI 提供了一套在主流可微学习之外非常关键的“第二工具箱”。

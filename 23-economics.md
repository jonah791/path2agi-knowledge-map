---
title: 经济学
aliases:
  - Economics
category:
  - 决策、交互与社会机制
tags:
  - ai-foundations
  - decision
  - economics
type: topic
status: stable
importance: important
version: v2.1
date: '2026-04-08'
---

# 经济学、偏好与对齐（Economics, Preferences, and Alignment）：从起源到 AI 的完整脉络

> **上帝视角**：经济学为 AI 提供的不只是资源配置视角，更是一套讨论**偏好、激励、制度与对齐**的语言。奖励函数设计本质上是激励设计问题：如何让 AI 在追求代理目标时，仍然服务于人类真实意图？行为经济学揭示了人类偏好的非理性与不稳定性，社会选择理论提醒我们群体偏好并不天然一致，而委托—代理框架则解释了为什么 AI 对齐不是“把目标写清楚”这么简单。

---

## 相关主题

- [[12-game-theory|博弈论]]：博弈论分析互动结构与均衡，经济学进一步处理偏好、制度与激励设计
- [[11-operations-research|运筹学]]：运筹学更偏求解与资源配置，经济学更偏目标函数、效用与制度安排
- [[21-psychology|心理学]]：行为经济学大量吸收心理学关于偏差、启发式与偏好不稳定的发现
- [[09-causal-inference|因果推断]]：计量经济学长期推动了反事实识别与政策评估工具
- [[25-philosophy|哲学]]：经济学中的福利、偏好与公平问题最终仍与规范哲学相连

---

## 1. 上帝视角：为什么 AI 需要经济学、偏好与对齐

经济学在 AI 中最核心的价值，不是提供一套泛泛的“市场隐喻”，而是帮助我们回答四个更具体的问题：

- **AI 到底在替谁优化、优化什么偏好？**
- **怎样设计激励，使系统行为尽量符合人类目标？**
- **当多个主体偏好不一致时，如何聚合与协调？**
- **当人类反馈本身存在偏差时，AI 对齐会遇到什么问题？**

因此，这一章更适合从**偏好、激励、制度与对齐**的角度理解经济学对 AI 的贡献，而不是把所有与经济学相关的方法论都纳入其中。因果识别虽然在计量经济学传统中发展成熟，但在当前 26 学科结构中已经由独立专题”因果推断与结构因果模型”展开。

- **奖励函数设计** = 机制设计（mechanism design）：如何设计规则，使参与者（AI 智能体）在追求自身目标时，同时实现设计者（人类）的意图？
- **偏好学习** = 效用估计（utility estimation）：如何从人类的选择行为中推断其真实偏好？
- **多智能体协调** = 市场均衡（market equilibrium）：多个 AI 智能体如何在共享环境中达成高效协作？
- **AI 对齐** = 激励相容（incentive compatibility）：如何确保 AI 的最优策略恰好是人类期望的行为？

### 与其他学科的关键连接

| 连接学科 | 经济学贡献 | AI 中的体现 |
|---------|-----------|------------|
| 博弈论（Game Theory） | 纳什均衡、机制设计 | 多智能体强化学习、对抗训练 |
| 心理学（Psychology） | 行为经济学、前景理论 | RLHF 中的人类偏好建模 |
| 运筹学（Operations Research） | 最优化、资源分配 | 调度算法、组合优化 |
| 信息论（Information Theory） | 信息不对称、信号博弈 | 对抗样本、信息瓶颈 |
| 控制论（Cybernetics） | 反馈机制、系统稳定性 | 奖励塑形、训练稳定性 |
| 因果推断 (09) | 计量经济学传统、反事实分析 | 评估部署后果、因果发现 |

---

## 2. 历史脉络

经济学的发展史与 AI 的演进有着深刻的交织。以下按时间线梳理关键里程碑：

### 2.1 古典经济学时期（18-19 世纪）

- **Adam Smith (1776)**：《国富论》（*An Inquiry into the Nature and Causes of the Wealth of Nations*）提出"看不见的手"（invisible hand），在特定条件下个体追求自利可能带来较高的整体协调效率——这一思想常被用来类比去中心化多智能体系统的设计。
- **David Ricardo (1817)**：比较优势理论（comparative advantage），为分工与专业化提供了理论基础，影响了多智能体任务分配。
- **Antoine Augustin Cournot (1838)**：首次用数学方法分析寡头竞争，开创了数理经济学，其 Cournot 竞争模型至今用于多智能体博弈分析。
- **Léon Walras (1874)**：一般均衡理论（general equilibrium theory），证明了市场可以同时达到所有商品的供需平衡。

### 2.2 边际革命与效用理论（19 世纪末-20 世纪初）

- **William Stanley Jevons, Carl Menger, Léon Walras (1870s)**：边际效用理论（marginal utility theory），将经济学建立在个体选择的数学基础上。
- **Vilfredo Pareto (1906)**：Pareto 最优（Pareto optimality），定义了资源配置的效率标准——在多目标优化和 AI 公平性研究中广泛使用。
- **Frank Ramsey (1928)**：最优储蓄理论，引入了跨期决策的数学框架，影响了强化学习中的折扣因子设计。

### 2.3 现代经济学的数学化（1940s-1970s）

- **John von Neumann & Oskar Morgenstern (1944)**：《博弈论与经济行为》（*Theory of Games and Economic Behavior*），建立了期望效用理论（expected utility theory）的公理化基础。效用函数 u 满足：若 A 优于 B，则 u(A) > u(B)。
- **Kenneth Arrow (1951)**：不可能定理（impossibility theorem）——不存在满足所有合理条件的社会选择函数。这对 AI 中的偏好聚合问题有深远影响：如何从多个标注者的偏好中得到一致的奖励信号？
- **Gerard Debreu (1959)**：一般均衡存在性的严格证明，将经济学推向了高度数学化。
- **William Vickrey (1961)**：第二价格密封拍卖（Vickrey auction），证明了真实出价是占优策略——这是机制设计中激励相容的经典范例。
- **Leonid Hurwicz (1972)**：正式提出机制设计理论（mechanism design theory），研究如何设计博弈规则以实现特定社会目标。
- **Roger Myerson (1981)**：最优拍卖设计（optimal auction design），给出了收益最大化拍卖的一般理论。

### 2.4 行为经济学革命（1970s-2000s）

- **Daniel Kahneman & Amos Tversky (1979)**：前景理论（prospect theory），揭示人类决策中的系统性偏差：
  - 损失厌恶（loss aversion）：损失的痛苦约为等量收益快乐的 2 倍
  - 概率加权（probability weighting）：人们高估小概率事件，低估大概率事件
  - 参考点依赖（reference dependence）：效用取决于相对变化而非绝对水平
- **Richard Thaler (1980s-2000s)**：心理账户（mental accounting）、禀赋效应（endowment effect）、助推理论（nudge theory）。
- **Colin Camerer (2003)**：行为博弈论（behavioral game theory），将实验数据与博弈论结合。

### 2.5 经济学与 AI 的融合（2010s-至今）

- **Hal Varian (2014)**：Google 首席经济学家，将拍卖理论应用于广告竞价系统。
- **Paul Christiano et al. (2017)**：提出 RLHF（Reinforcement Learning from Human Feedback），用人类偏好训练奖励模型，这一过程可借助从行为数据中估计效用的视角来理解。
- **OpenAI (2022)**：InstructGPT 大规模应用 RLHF，将经济学的偏好理论工程化。
- **Stuart Russell (2019)**：《人类兼容》（*Human Compatible*）提出合作逆强化学习（CIRL），将 AI 对齐问题形式化为委托-代理问题。
- **Susan Athey、Guido Imbens 等（2010s-2020s）**：推动现代计量经济学与机器学习结合，使因果识别正式进入 AI 评估与政策应用场景。

---

## 3. 核心知识点详解

### 3.1 效用理论与理性选择

#### 经济学理论

效用理论是经济学的基石。理性人假设（rational agent hypothesis）认为，决策者拥有完备且传递的偏好关系，并选择最大化期望效用的行动。

von Neumann-Morgenstern 期望效用定理指出，若偏好满足完备性、传递性、连续性和独立性公理，则存在效用函数 $u$，使得：

$$EU(L) = \sum_{i} p_i \cdot u(x_i)$$

其中 $L$ 是彩票（lottery），$p_i$ 是结果 $x_i$ 的概率。

#### 数学化表述

风险态度由效用函数的曲率决定：
- 风险厌恶（risk averse）：$u''(x) < 0$（凹函数）
- 风险中性（risk neutral）：$u''(x) = 0$（线性函数）
- 风险偏好（risk seeking）：$u''(x) > 0$（凸函数）

Arrow-Pratt 绝对风险厌恶系数：

$$r(x) = -\frac{u''(x)}{u'(x)}$$

#### 直觉理解

效用理论的重点不是“奖励越多越好”这么简单，而是不同主体会以不同方式感受收益和风险。AI 一旦要替人做决策，就必须明确它到底在最大化哪种偏好结构。

#### AI 中的角色

- **强化学习中的奖励函数**：智能体最大化累积奖励，本质上就是期望效用最大化。折扣因子 γ 对应经济学中的时间偏好（time preference）。
- **RLHF 中的偏好建模**：Bradley-Terry 模型假设人类选择概率由两个选项的效用差决定，其中 r 是隐含的效用函数（奖励模型）。
- **多目标优化**：当 AI 需要平衡多个目标时，Pareto 最优提供了效率标准。
- **风险敏感强化学习**：将风险厌恶引入策略优化，使 AI 在不确定环境中更加稳健。

### 3.2 机制设计

#### 经济学理论

机制设计（mechanism design）被称为"逆博弈论"——博弈论分析给定规则下的均衡，而机制设计是设计规则以实现期望的均衡。

核心概念：
- **社会选择函数**（social choice function）$f: \Theta^n \to X$，将所有参与者的类型映射到结果
- **激励相容**（incentive compatibility）：每个参与者如实报告自己的类型是最优策略
- **个体理性**（individual rationality）：参与机制不会比不参与更差

#### 数学化表述

**显示原理**（revelation principle）：任何可由某机制实现的社会选择函数，都可以由一个直接机制（参与者直接报告类型）以激励相容的方式实现。

形式化地，机制由消息空间 M 和结果函数 g 组成。激励相容要求：

$$u_i(g(\theta_i, \theta_{-i}), \theta_i) \geq u_i(g(\theta_i', \theta_{-i}), \theta_i), \quad \forall \theta_i, \theta_i', \theta_{-i}$$

即如实报告 $\theta_i$ 是占优策略。

**Vickrey-Clarke-Groves (VCG) 机制**：一类满足激励相容和效率的通用机制。参与者 $i$ 的支付为：

$$t_i = \sum_{j \neq i} v_j(x^*_{-i}) - \sum_{j \neq i} v_j(x^*)$$

其中 $x^*$ 是社会最优结果，$x^*_{-i}$ 是去掉参与者 $i$ 后的最优结果。

#### 直觉理解

机制设计关心的不是“参与者会怎么做”，而是“我该如何定规则，才能让他们愿意按我希望的方式行动”。这与设计 AI 的奖励函数、本地激励和平台协议有明显的结构相似性，因此常被用作分析这些问题的参照框架。

可以用一个很具体的对齐场景来理解：如果一个模型要学会“有帮助但不胡编”，那么训练者其实同时在做三件事。第一，定义什么叫“有帮助”，这是偏好问题；第二，设计标注和比较协议，让标注者能稳定表达这些偏好，这是机制设计问题；第三，把这些偏好转成模型能优化的奖励信号，这是代理目标问题。只把它写成一个 loss，并不能自动解决前两层问题。

#### AI 中的角色

- **奖励函数设计**：训练 AI 的奖励函数就是一个机制——它定义了"游戏规则"，AI 在此规则下优化行为。设计不当的奖励函数会导致奖励黑客（reward hacking）。
- **联邦学习中的激励**：如何激励多个数据持有者真实地贡献数据？机制设计提供了理论工具。
- **AI 市场设计**：多个 AI 服务提供商竞争时，平台如何设计规则以最大化社会福利？

### 3.3 拍卖理论

#### 经济学理论

拍卖是机制设计最成功的应用领域。四种经典拍卖形式：

1. **英式拍卖**（English auction）：公开递增出价，最高者得
2. **荷式拍卖**（Dutch auction）：价格递减，第一个接受者得
3. **第一价格密封拍卖**（first-price sealed-bid）：最高出价者以其出价支付
4. **第二价格密封拍卖**（second-price sealed-bid / Vickrey auction）：最高出价者以第二高出价支付

#### 数学化表述

**收益等价定理**（revenue equivalence theorem, Myerson 1981）：在独立私有价值（IPV）模型下，若所有竞拍者风险中性且价值独立同分布，则任何满足以下条件的拍卖机制产生相同的期望收益：
1. 物品分配给估值最高的竞拍者
2. 估值最低的竞拍者期望支付为零

在均匀分布且有 n 个竞拍者的情况下：

- 第一价格拍卖的均衡出价策略：
  $$b(v) = \frac{n-1}{n} v$$
- 第二价格拍卖的均衡出价策略：$b(v) = v$（真实出价）
- 两种拍卖的期望收益均为：
  $$E[R] = \frac{n-1}{n+1}$$

其中：
- $v$ 表示竞拍者对物品的私人估值
- $b(v)$ 表示在估值为 $v$ 时的均衡出价策略
- $n$ 表示竞拍者数量
- $E[R]$ 表示卖方的期望收益

#### AI 中的角色

- **在线广告竞价**：Google、Meta 等平台的广告系统通常可用大规模拍卖框架来理解。广义第二价格拍卖（GSP）曾被广泛讨论和采用，VCG 机制则更多作为重要的理论基准。
- **计算资源分配**：云计算中的竞价实例（spot instances）使用拍卖机制分配计算资源。
- **自动出价代理**：AI 代理代替广告主参与实时竞价（RTB），需要学习最优出价策略。

#### 直觉理解

拍卖理论关心的是：在不同规则下，理性的参与者会如何出价，以及平台最终会得到什么结果。第一价格拍卖鼓励“压价出手”，因为赢家按自己的报价付款；第二价格拍卖则鼓励真实报价，因为赢家只需支付第二高价。收益等价定理的价值，在于说明很多看起来不同的拍卖规则，在特定条件下可能给出相同的平均收益，但它们对行为透明度、实现复杂度和平台目标的影响并不相同。

### 3.4 行为经济学

#### 经济学理论

行为经济学挑战了传统的理性人假设，揭示了人类决策中的系统性偏差。这些发现对 AI 系统设计有深远影响——因为 AI 的训练数据和反馈信号来自非理性的人类。

**前景理论**（prospect theory, Kahneman & Tversky 1979）的核心要素：

1. **价值函数**（value function）：以参考点为中心，损失区域比收益区域更陡峭
2. **概率加权函数**（probability weighting function）：主观决策权重与客观概率系统性偏离
3. **框架效应**（framing effect）：同一问题的不同表述方式影响决策

#### 数学化表述

前景理论的价值函数：

$$v(x) = \begin{cases} x^\alpha & \text{if } x \geq 0 \\ -\lambda(-x)^\beta & \text{if } x < 0 \end{cases}$$

其中 $\alpha, \beta \approx 0.88$，$\lambda \approx 2.25$（损失厌恶系数）。

概率加权函数（Prelec 1998）：

$$w(p) = \exp(-(-\ln p)^\gamma)$$

其中 $\gamma \approx 0.65$，导致小概率被高估、大概率被低估。

其他重要的认知偏差：
- **锚定效应**（anchoring）：初始信息对后续判断的不成比例影响
- **可得性启发**（availability heuristic）：容易想到的事件被认为更可能发生
- **确认偏差**（confirmation bias）：倾向于寻找支持已有信念的证据
- **现状偏差**（status quo bias）：偏好维持现状
- **双曲折扣**（hyperbolic discounting）：折扣函数为 D(t) = 1/(1+kt)，导致时间不一致的偏好

#### 直觉理解

行为经济学提醒我们，人类反馈不是“干净标签”，而是夹杂着锚定、框架和损失厌恶的真实心理产物。AI 若直接把这些反馈当成客观真理，就会把偏差一起学进去。

#### AI 中的角色

- **RLHF 的偏差问题**：人类标注者的偏好受到框架效应、锚定效应等影响，导致奖励模型学到有偏的人类偏好。
- **推荐系统中的偏差**：用户的点击行为受位置偏差（position bias）、流行度偏差（popularity bias）等影响，需要去偏（debiasing）技术。
- **AI 助推**（AI nudging）：利用行为经济学原理设计 AI 界面，引导用户做出更好的决策——但也引发伦理争议。
- **鲁棒偏好学习**：如何从有偏的人类反馈中学到"真实"偏好？需要建模人类的认知偏差并加以校正。

### 3.5 计量经济学与因果问题的接口

经济学与因果推断的关系主要体现在**计量经济学**（econometrics）的识别传统中。它关心的问题是：在存在混杂因素、选择偏差和观测噪声时，如何识别某个干预的真实效果？这条传统推动了工具变量、双重差分、断点回归、合成控制等方法的发展。

在 AI 语境下，这些方法对于推荐系统评估、广告增量收益分析、高影响决策系统以及离线强化学习中的反事实评估都非常重要。但从专题结构上看，这部分问题意识已经超出了本章”偏好、激励与对齐”的核心职责，因此在当前 26 学科结构中，由独立专题**因果推断与结构因果模型**系统展开。

本章保留这一节，是为了强调历史谱系与接口关系：

- 经济学长期推动了因果识别方法的发展
- AI 的部署与评估问题经常借用这一传统
- 但完整的因果方法论不再由本章代管

#### AI 中的角色

- **部署评估**：广告、推荐和平台策略的增量收益分析直接借用计量经济学识别工具。
- **反事实分析**：离线强化学习和政策评估常借助工具变量、双重差分等思想处理偏差。
- **高影响决策系统**：在教育、医疗、金融等场景中，因果识别帮助区分“预测相关”与“真实干预效果”。

### 3.6 AI 对齐的经济学视角

#### 核心问题

AI 对齐（AI alignment）问题可以用经济学的委托-代理框架（principal-agent framework）来理解：

- **委托人**（principal）= 人类（设计者/用户）
- **代理人**（agent）= AI 系统
- **信息不对称**：AI 可能拥有人类不具备的信息或能力
- **利益冲突**：AI 的优化目标可能与人类的真实意图不一致

#### 数学化表述

**合作逆强化学习**（Cooperative Inverse Reinforcement Learning, CIRL, Hadfield-Menell et al. 2016）：

将人机交互建模为双人合作博弈：
- 人类的效用函数依赖于未知参数 θ
- 机器人的目标是最大化人类的效用：$\max_{a_R} E[u_H | \theta]$
- 但机器人不知道 $\theta$，需要从人类的行为中推断

这产生了一个关键性质：**AI 的最优策略包含主动询问和谦逊行为**——因为它知道自己不确定人类的真实偏好。

**Goodhart 定律的形式化**（Manheim & Garrabrant 2019）：

当代理优化代理指标 $\hat{u}$ 而非真实目标 $u$ 时：

$$\text{regret} = u^* - u(\arg\max_a \hat{u}(a))$$

其中：
- $u^*$ 表示真实目标下的最优效用
- $\hat{u}(a)$ 表示被系统优化的代理指标
- $\arg\max_a \hat{u}(a)$ 表示在代理指标意义下最优的动作
- $\text{regret}$ 表示代理最优与真实最优之间的效用差距

遗憾（regret）随优化压力增大而增大——优化越强，代理指标与真实目标的偏离越严重。

#### 关键机制

1. **激励相容的奖励设计**：设计奖励函数使 AI 的最优策略恰好是人类期望的行为
2. **可验证的承诺**（verifiable commitment）：AI 能否可信地承诺遵守某些约束？
3. **信息租金**（information rent）：AI 因拥有私有信息而获得的额外"收益"，可能导致操纵行为
4. **合同理论**（contract theory）：如何设计人机之间的"合同"以约束 AI 行为？

#### 直觉理解

AI 对齐的经济学问题不只是“把目标写清楚”，而是“在信息不对称和代理优化下，怎样让系统没有动机钻规则空子”。Goodhart 定律和委托-代理模型都在提醒我们：指标一旦变成目标，就会被过度利用。

#### AI 中的角色

- **对齐建模**：把人机关系形式化为带不确定偏好的合作博弈
- **奖励黑客分析**：解释代理指标为何会偏离真实目标
- **制度化约束**：为多代理系统的权限、监督与问责提供框架

---

## 4. 对 AI 的核心贡献

### 4.1 奖励建模与偏好学习

经济学的效用理论为 RLHF 提供了理论基础。Bradley-Terry 模型（1952）原本用于体育排名，现在是奖励建模的标准方法：

$$P(y_w \succ y_l | x) = \sigma(r_\theta(x, y_w) - r_\theta(x, y_l))$$

训练目标是最大化对数似然：

$$\mathcal{L}(\theta) = -E_{(x, y_w, y_l)} [\log \sigma(r_\theta(x, y_w) - r_\theta(x, y_l))]$$

这本质上是从成对比较数据中估计效用函数——经济学中的离散选择模型（discrete choice model）。

### 4.2 拍卖与市场设计

互联网广告是经济学理论最大规模的工程应用：
- Google 的广告系统每秒处理数百万次拍卖
- 广义第二价格拍卖（GSP）保证了近似激励相容
- 自动出价代理使用强化学习优化长期收益

### 4.3 多智能体经济系统

经济学的市场均衡理论启发了多智能体系统设计：
- **Fisher 市场模型**：多个买家竞争有限资源，均衡价格实现高效分配
- **Walrasian 拍卖**：通过价格调整达到供需平衡
- **代币经济**（token economy）：在多智能体环境中引入虚拟货币促进合作

### 4.4 计量经济学与因果问题的历史接口

计量经济学发展的因果识别方法已经深刻影响 AI 社区，包括工具变量、断点回归、双重差分和合成控制等。它们帮助系统从观察数据中区分相关性改善与真实干预效果。

不过，在当前 26 学科结构中，这部分内容由独立专题**因果推断与结构因果模型**系统展开；本章仅保留其作为经济学历史谱系的一部分，用来说明偏好、制度与部署后果分析之间的连接。

---

## 5. 与相邻学科的边界

### 5.1 与博弈论与机制设计

- **博弈论与机制设计**更偏向战略互动、均衡概念与机制设计的形式框架。
- **本章**更偏向偏好、效用、激励、社会选择与 AI 对齐的制度目标。

### 5.2 与因果推断与结构因果模型

- **因果推断与结构因果模型**负责系统展开干预、反事实、结构因果模型与识别方法。
- **本章**只保留计量经济学与因果问题之间的历史接口，不再代管完整因果方法论。

### 5.3 与心理学

- **心理学**更关注人类行为偏差、启发式与反馈噪声的认知来源。
- **本章**则关注这些偏差如何影响偏好建模、制度设计与对齐目标。

---

## 6. 前沿与开放问题

### 6.1 大语言模型时代的经济学问题

- **LLM 作为经济代理**：大语言模型能否模拟理性经济行为？实验表明 LLM 展现出类似人类的认知偏差（Chen et al. 2023）。
- **AI 生成内容的定价**：如何为 AI 生成的文本、图像、代码定价？传统的边际成本定价在零边际成本的数字产品中失效。
- **数据市场设计**：数据作为生产要素，如何设计公平高效的数据交易机制？

### 6.2 AI 对齐的经济学前沿

- **可扩展的人类监督**（scalable oversight）：当 AI 能力超越人类时，如何设计激励机制确保 AI 仍然可控？
- **宪法 AI**（Constitutional AI）：用规则约束 AI 行为，类似于法律和制度设计。
- **迭代放大**（iterated amplification）：通过分解任务降低信息不对称。

### 6.3 AI 对劳动市场的影响

- **技能溢价变化**：AI 自动化如何改变不同技能的市场价值？
- **人机互补 vs 替代**：哪些任务中 AI 是人类的互补品，哪些是替代品？
- **通用基本收入**（UBI）：如果 AI 大规模替代人类劳动，经济体系如何调整？

### 6.4 开放问题

1. 如何设计对 Goodhart 定律鲁棒的奖励函数？
2. 多个 AI 系统在共享环境中博弈时，是否会出现市场失灵（market failure）？
3. 如何将 Arrow 不可能定理的限制纳入多标注者偏好聚合？
4. AI 系统能否学会"公平"——经济学中的公平概念（envy-freeness, proportionality）如何应用于 AI？
5. 当 AI 代理代替人类参与市场时，传统的均衡理论是否仍然成立？

---

## 7. 推荐阅读与参考文献

### 经典教材

- Mas-Colell, A., Whinston, M. D., & Green, J. R. (1995). *Microeconomic Theory*. Oxford University Press.
- Nisan, N., Roughgarden, T., Tardos, É., & Vazirani, V. V. (2007). *Algorithmic Game Theory*. Cambridge University Press.
- Krishna, V. (2009). *Auction Theory*. Academic Press.
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.

### 关键论文

- von Neumann, J., & Morgenstern, O. (1944). Theory of Games and Economic Behavior. *Princeton University Press*.
- Arrow, K. J. (1951). Social Choice and Individual Values. *Wiley*.
- Vickrey, W. (1961). Counterspeculation, Auctions, and Competitive Sealed Tenders. *The Journal of Finance*, 16(1), 8-37.
- Hurwicz, L. (1972). On Informationally Decentralized Systems. *Decision and Organization*, 297-336.
- Kahneman, D., & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk. *Econometrica*, 47(2), 263-291.
- Myerson, R. B. (1981). Optimal Auction Design. *Mathematics of Operations Research*, 6(1), 58-73.
- Bradley, R. A., & Terry, M. E. (1952). Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons. *Biometrika*, 39(3/4), 324-345.
- Christiano, P. F., et al. (2017). Deep Reinforcement Learning from Human Preferences. *NeurIPS*.
- Hadfield-Menell, D., et al. (2016). Cooperative Inverse Reinforcement Learning. *NeurIPS*.
- Russell, S. (2019). *Human Compatible: Artificial Intelligence and the Problem of Control*. Viking.

### AI 对齐与经济学

- Manheim, D., & Garrabrant, S. (2019). Categorizing Variants of Goodhart's Law. *arXiv:1803.04585*.
- Zhuang, S., & Hadfield-Menell, D. (2020). Consequences of Misaligned AI. *NeurIPS*.
- Ouyang, L., et al. (2022). Training Language Models to Follow Instructions with Human Feedback. *NeurIPS*.

### 在线资源

- Coursera: Game Theory (Stanford University)
- MIT OpenCourseWare: Microeconomic Theory
- Alignment Forum (alignmentforum.org): AI 对齐研究社区

---

## 8. 本篇在全书中的位置

本篇负责把 AI 中常见的“偏好、激励、制度、奖励失配”问题组织成一套更清楚的语言。它提醒我们，很多 AI 问题并不是“模型不会优化”，而是“我们没有把人类真实想要的东西稳定地写进优化目标”。

**与相邻篇章的关系**：
- 与[[12-game-theory|博弈论]]相邻：博弈论更强调互动结构和均衡概念，经济学更系统讨论偏好、福利、制度和机制设计。
- 与[[11-operations-research|运筹学]]分工：运筹学更像求解器与决策骨架，经济学则更像目标、激励与制度解释层。
- 与[[21-psychology|心理学]]互补：心理学解释人类反馈为何会有偏差，经济学研究如何在这种偏差下仍设计可用机制。
- 与[[09-causal-inference|因果推断]]连接：很多部署后效果评估、本地激励设计和政策后果判断都依赖反事实分析。

**贡献边界**：
经济学并不直接提供神经网络结构、表示学习或感知建模方法。它最强的地方，是解释“目标怎么定义、偏好怎么聚合、激励怎么设计、制度怎么约束代理行为”，因此它更像 AI 对齐与多主体协调的解释框架层，而不是底层训练算法本身。

---
title: 微积分与优化理论
aliases:
  - Calculus and Optimization Theory
category:
  - 数学与形式基础
tags:
  - ai-foundations
  - math
  - calculus
  - optimization
type: topic
status: stable
importance: core
version: v2.0
date: '2026-04-08'
---

# 微积分与优化理论（Calculus and Optimization Theory）：从起源到 AI 的完整脉络

> **上帝视角**：微积分提供了“可微结构”与梯度计算规则，优化理论提供了“如何沿这些梯度搜索参数”的策略。反向传播建立在链式法则之上，梯度下降则是最常用的一类训练方法。没有微积分与优化的结合，现代神经网络训练几乎无法展开。

---

## 相关主题

- [[01-probability-and-statistics|概率论与数理统计]]：参数估计与似然最大化问题通常被转化为优化问题
- [[02-linear-algebra|线性代数]]：梯度、雅可比矩阵与 Hessian 矩阵都依赖线性代数表达
- [[05-approximation-theory|逼近论]]：模型训练的目标之一就是用有限参数逼近复杂函数
- [[11-numerical-analysis|数值分析]]：实际训练中的收敛性、稳定性与误差控制属于数值分析核心问题
- [[13-cybernetics|控制论]]：最优控制、反馈调节与强化学习中的策略更新都与优化紧密相关

## 1. 上帝视角：为什么 AI 需要微积分与优化

### 1.1 训练 = 优化，学习 = 梯度下降

深度学习的本质可以用一句话概括：**找到一组参数 $\theta$，使得损失函数 $L(\theta)$ 最小化**。这正是优化理论的核心问题。

$$\theta^* = \arg\min_{\theta} L(\theta; \mathcal{D})$$

其中 θ 表示神经网络的参数向量，D 是训练数据集，L(θ; D) 是在数据上定义的经验损失。

整个训练过程就是在高维参数空间中，沿着损失函数的梯度方向不断调整参数：

$$\theta_{t+1} = \theta_t - \eta \nabla_\theta L(\theta_t)$$

其中 $\eta$ 是学习率，$\nabla_\theta L(\theta_t)$ 表示当前参数处的梯度。

这个看似简单的更新公式，背后是微积分三百多年的积累。

### 1.2 微积分与优化理论的分工

虽然本篇将两者合并讨论，但需要明确它们在 AI 中的不同角色：

**微积分（Calculus）**：提供"如何计算梯度"的工具
- **核心贡献**：链式法则 → 反向传播算法
- **关键问题**：给定复合函数 `f(g(h(x)))`，如何高效计算 `∂f/∂x`？
- **在 AI 中的体现**：自动微分（automatic differentiation）、计算图（computational graph）
- **理论基础**：导数、偏导数、方向导数、梯度、Jacobian 矩阵、Hessian 矩阵

**优化理论（Optimization Theory）**：提供"如何使用梯度找到最优解"的策略
- **核心贡献**：梯度下降及其变体 → 神经网络训练算法
- **关键问题**：给定目标函数 `L(θ)` 和梯度 `∇L(θ)`，如何迭代更新 `θ` 以找到最小值？
- **在 AI 中的体现**：SGD、Adam、学习率调度、正则化、约束优化
- **理论基础**：凸优化、非凸优化、收敛性分析、鞍点问题

**两者的协作**：
- 微积分告诉我们"梯度是什么"，优化理论告诉我们"如何用梯度"
- 反向传播（微积分）计算梯度，梯度下降（优化）使用梯度更新参数
- 没有微积分，我们无法高效计算梯度；没有优化理论，我们不知道如何利用梯度找到好的解

### 1.3 微积分先定义“可微”，优化再决定“怎么走”

在深度学习里，很多讨论会直接把“训练”说成“优化”，但在数学上还需要再往前退一步。只有当模型由一系列可微操作组成时，我们才有资格谈：

- 哪些方向导数存在；
- 梯度、Jacobian、Hessian 分别描述什么局部变化；
- 计算图上的局部导数如何通过链式法则传回参数层；
- 哪些操作会让梯度消失、爆炸或不可导。

因此，微积分并不只是优化的附属工具。它先规定了模型能否被稳定求导、梯度能否被高效传播；优化理论才在这个基础上讨论“用什么更新规则、在什么条件下收敛、遇到非凸景观怎么办”。

### 1.4 与其他学科的关键连接点

| 学科 | 连接点 | 具体体现 |
|------|--------|----------|
| 概率论（Probability） | 损失函数的概率解释 | 最大似然估计 = 最小化交叉熵损失 |
| 线性代数（Linear Algebra） | 梯度的矩阵表示 | Jacobian 矩阵、Hessian 矩阵 |
| 控制论（Control Theory） | 动态系统的优化 | 学习率调度类似 PID 控制 |
| 逼近论（Approximation Theory） | 函数逼近的误差界 | 万能逼近定理的理论基础 |
| 信息论（Information Theory） | 信息量与损失函数 | KL 散度、交叉熵 |
| 数值分析（Numerical Analysis） | 数值稳定性 | 梯度消失/爆炸、混合精度训练 |
| 统计学（Statistics） | 泛化理论 | 偏差-方差权衡、正则化 |

---

## 2. 历史脉络

### 2.1 微积分的诞生（17 世纪）

- **Newton（1665-1666）**：在瘟疫隔离期间发展了"流数法"（method of fluxions），将导数理解为瞬时变化率。他的动机来自物理学——描述运动和引力。
- **Leibniz（1684）**：独立发明微积分，引入了我们今天仍在使用的导数符号 dy/dx 和积分符号 ∫。Leibniz 的符号系统更适合链式法则的表达，这对后来的反向传播至关重要。
- **Newton-Leibniz 公式**：微积分基本定理将微分与积分统一起来：

$$\int_a^b f'(x) dx = f(b) - f(a)$$

### 2.2 变分法的兴起（18 世纪）

- **Euler（1744）**：发表《寻找具有极大极小性质曲线的方法》，奠定变分法基础。变分法处理的是函数的函数（泛函）的极值问题。
- **Lagrange（1788）**：在《分析力学》中系统化了变分法，引入 **Lagrange 乘数法**（method of Lagrange multipliers）处理约束优化：

$$\nabla f = \lambda \nabla g \quad \text{（在约束 } g(x) = 0 \text{ 下）}$$

- **Euler-Lagrange 方程**：

$$\frac{\partial F}{\partial y} - \frac{d}{dx}\frac{\partial F}{\partial y'} = 0$$

这个方程是现代变分推断（variational inference）的数学根基。

### 2.3 梯度下降的发明（19 世纪）

- **Cauchy（1847）**：在论文《关于确定一阶方程组近似解的一般方法》中首次提出梯度下降法。他的想法朴素而深刻：沿着函数下降最快的方向走，就能逼近最小值。
- **Hadamard（1908）**：将梯度下降推广到更一般的函数空间。

### 2.4 凸优化理论的成熟（20 世纪中叶）

- **Kantorovich（1939）**：线性规划，为运筹学和优化理论奠基。
- **Karush-Kuhn-Tucker 条件（1951）**：约束优化的必要条件，推广了 Lagrange 乘数法：

$$\nabla f(x^*) + \sum_{i} \mu_i \nabla g_i(x^*) + \sum_{j} \lambda_j \nabla h_j(x^*) = 0$$

- **Dantzig（1947）**：单纯形法（simplex method），线性规划的实用算法。
- **Rockafellar（1970）**：《凸分析》系统化了凸优化理论。

### 2.5 反向传播与深度学习（20 世纪后半叶）

- **Werbos（1974）**：在博士论文中首次提出反向传播（backpropagation）的思想，但未引起广泛关注。
- **Rumelhart, Hinton & Williams（1986）**：在 Nature 发表《Learning representations by back-propagating errors》，使反向传播成为神经网络训练的标准方法。这篇论文的核心就是链式法则的系统应用。
- **LeCun et al.（1989）**：将反向传播应用于卷积神经网络，识别手写数字。

### 2.6 现代优化器的演进（21 世纪）

- **Duchi et al.（2011）**：AdaGrad——自适应学习率的先驱。
- **Hinton（2012）**：RMSProp——在 Coursera 课程中提出，解决 AdaGrad 学习率衰减过快的问题。
- **Kingma & Ba（2014）**：**Adam（Adaptive Moment Estimation）**——结合 Momentum 和 RMSProp，成为深度学习最常用的优化器。
- **Loshchilov & Hutter（2017）**：AdamW——修正了 Adam 中权重衰减的实现。
- **Liu et al.（2019）**：RAdam——自动预热的 Adam 变体。

---

## 3. 核心知识点详解

### 3.1 链式法则与反向传播

#### 数学定义

链式法则（chain rule）是微积分中最重要的求导法则之一。对于复合函数 $f(g(x))$：

$$\frac{df}{dx} = \frac{df}{dg} \cdot \frac{dg}{dx}$$

推广到多变量情形，设：

- $z = f(x, y)$
- $x = g(t)$
- $y = h(t)$

则有：

$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$$

其中：
- $f$ 是关于中间变量 $x, y$ 的函数
- $t$ 是底层自变量
- 偏导数分别衡量 x、y 的局部变化对 z 的影响

#### 直觉理解

链式法则的直觉是"影响的传递"：如果 $x$ 的微小变化导致 $g$ 变化了 $\Delta g$，而 $g$ 的变化又导致 $f$ 变化了 $\Delta f$，那么 $x$ 对 $f$ 的总影响就是两个影响的乘积。

#### 一个两层网络的手算梯度例子

考虑一个只有单个隐藏单元的两层网络：

$$
z_1 = w_1 x,\quad h = \mathrm{ReLU}(z_1),\quad \hat{y} = w_2 h,\quad L = \frac{1}{2}(\hat{y}-y)^2
$$

取一个具体样本：$x=1$、$y=3$、$w_1=2$、$w_2=0.5$。前向传播得到：

$$
z_1 = 2,\quad h = 2,\quad \hat{y} = 1,\quad L = \frac{1}{2}(1-3)^2 = 2
$$

现在反向传播：

$$
\frac{\partial L}{\partial \hat{y}} = \hat{y} - y = -2
$$

对第二层权重，

$$
\frac{\partial L}{\partial w_2}
= \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial w_2}
 = (-2)\cdot h
 = -4
$$

对第一层权重，

$$
\frac{\partial L}{\partial w_1}
= \frac{\partial L}{\partial \hat{y}}
\cdot \frac{\partial \hat{y}}{\partial h}
\cdot \frac{\partial h}{\partial z_1}
\cdot \frac{\partial z_1}{\partial w_1}
= (-2)\cdot 0.5 \cdot 1 \cdot 1
= -1
$$

这个例子把“复合函数求导”落成了一个具体过程：误差先从输出层返回，再经过隐藏层的局部导数，一步步传回更早的参数。这正是反向传播的最小工作单元。

#### 在 AI 中的角色：反向传播算法

考虑一个简单的 2 层网络：

$$\hat{y} = \sigma(W_2 \cdot \sigma(W_1 \cdot x + b_1) + b_2)$$

损失函数如下：

$$L = \frac{1}{2}(\hat{y} - y)^2$$

反向传播的过程就是从输出层开始，逐层应用链式法则：

$$\frac{\partial L}{\partial W_2} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z_2} \cdot \frac{\partial z_2}{\partial W_2}$$

$$\frac{\partial L}{\partial W_1} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z_2} \cdot \frac{\partial z_2}{\partial h_1} \cdot \frac{\partial h_1}{\partial z_1} \cdot \frac{\partial z_1}{\partial W_1}$$

反向传播的关键洞察是：通过缓存前向传播的中间结果，可以高效地计算所有参数的梯度，时间复杂度与前向传播相同。

其中：
- 时间复杂度均为 $O(n)$
- $n$ 表示参数数量

> **代码示例**：参见 `code/math-foundations/backpropagation.py`

### 3.2 梯度下降及其变体

#### 3.2.1 vanilla 梯度下降（Gradient Descent）

最基本的优化算法，沿负梯度方向更新参数：

$$\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)$$

其中 $\eta$ 是学习率（learning rate）。

**三种变体按数据量区分**：
- **批量梯度下降（Batch GD）**：使用全部训练数据计算梯度，稳定但慢
- **随机梯度下降（SGD）**：每次只用一个样本，快但噪声大
- **小批量梯度下降（Mini-batch GD）**：折中方案，实践中最常用

#### 3.2.2 动量法（Momentum）

Polyak（1964）提出，引入"惯性"概念加速收敛：

$$v_t = \gamma v_{t-1} + \eta \nabla L(\theta_t)$$
$$\theta_{t+1} = \theta_t - v_t$$

其中 $v_t$ 是速度变量（velocity），$\gamma \in [0,1)$ 是动量系数，$\eta$ 是学习率，$\nabla L(\theta_t)$ 表示当前梯度。动量累积了历史梯度，从而让更新方向更加稳定。

直觉：想象一个球在损失曲面上滚动，动量让它能冲过小的局部凹陷，在一致的下坡方向上加速。典型的 $\gamma = 0.9$。

**Nesterov 加速梯度（NAG, 1983）**：先"预看"一步再计算梯度：

$$v_t = \gamma v_{t-1} + \eta \nabla L(\theta_t - \gamma v_{t-1})$$

其中 $L(\theta_t - \gamma v_{t-1})$ 是在预看位置计算的损失梯度，$\gamma v_{t-1}$ 是惯性预移动量，NAG 的预看让更新能在更准确的方向上提前修正。

#### 3.2.3 自适应学习率方法

**AdaGrad（2011）**：为每个参数维护独立的学习率，频繁更新的参数学习率变小：

$$\theta_{t+1,i} = \theta_{t,i} - \frac{\eta}{\sqrt{G_{t,ii} + \epsilon}} \cdot g_{t,i}$$

其中 $g_{t,i}$ 是第 $i$ 个参数在第 $t$ 步的梯度，$G_{t,ii}$ 是该参数梯度平方的累积和，$\epsilon$ 是防止除零的常数。频繁更新的参数分母变大，学习率收敛，罕见参数保留较大步长。

**RMSProp（2012）**：Hinton 的修正，使用指数移动平均代替累积和：

$$E[g^2]_t = \gamma E[g^2]_{t-1} + (1-\gamma) g_t^2$$
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{E[g^2]_t + \epsilon}} g_t$$

其中 $E[g^2]_t$ 是梯度平方的指数权重平均，$\gamma$ 控制平滑程度，$\epsilon$ 是稳定项。RMSProp 让更新步长根据梯度的近期尺度自适应调整，避免学习率全局固定。

**Adam（2014）**：结合 Momentum（一阶矩估计）和 RMSProp（二阶矩估计）：

$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t \quad \text{（一阶矩/均值）}$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2 \quad \text{（二阶矩/方差）}$$

其中 $m_t$ 和 $v_t$ 是梯度的一阶、二阶动量估计，$\beta_1$、$\beta_2$ 控制历史记忆长度，$g_t$ 是当前梯度。

偏差修正：

$$\hat{m}_t = \frac{m_t}{1-\beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1-\beta_2^t}$$

其中分母 $1-\beta_1^t$、$1-\beta_2^t$ 纠正初始时刻的偏差，确保动量估计在训练早期不会偏小。

更新规则：

$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$

其中 $\epsilon$ 保障数值稳定，$\hat{v}_t$ 决定每个参数的自适应步长，$\hat{m}_t$ 控制方向，Adam 聚合了动量与尺度信息。

默认超参数：$\beta_1 = 0.9$，$\beta_2 = 0.999$，$\epsilon = 10^{-8}$。

#### 直觉理解

梯度下降本质上是在损失曲面上做负梯度方向的"下坡"。在小批量 SGD 中，每个 batch 采样出的梯度都有噪声，使得更新轨迹呈现抖动；动量则像给球体加上惯性，使其更容易穿越鞍点；自适应学习率调整规则对应不同方向的尺度差异，避免某些参数更新过快或过慢。将这些直觉结合起来，可以理解为一个自适应、有惯性的"下山"过程。

#### AI 中的角色

不同的项目选择不同的优化器：ResNet、Transformer 等大型模型常用 Adam 或 LAMB 来处理非平稳梯度；BERT 预训练阶段则结合 warmup + AdamW；在超大模型的微调或生成模型训练中，SGD + Momentum 仍被用于保持良好泛化，尤其在低批量下。AutoML、RL 训练也会用 gradient clipping、gradient accumulation、layer-wise lr decay 等技巧，将微积分的梯度更新机制转化为真正可部署的训练管道。

> **代码示例**：参见 `code/ml-algorithms/optimizer_comparison.py`

### 3.3 凸优化与非凸优化

#### 凸函数的定义

函数 $f$ 是凸函数（convex function），当且仅当对任意 $x, y$ 和 $\lambda \in [0, 1]$：

$$f(\lambda x + (1-\lambda) y) \leq \lambda f(x) + (1-\lambda) f(y)$$

其中 $\lambda$ 表示连线中点的权重，左边是在连线上取值的函数，右边是端点值的凸组合，这个不等式保证函数图像上的线段不会高于函数本身。

几何直觉：函数图像上任意两点的连线段都在函数图像的上方。

#### 凸优化的优良性质

- **局部最小值 = 全局最小值**：这是凸优化最重要的性质
- **强对偶性**：在 Slater 条件下，原问题与对偶问题有相同的最优值
- **高效算法**：内点法可以在多项式时间内求解
- **可证明的收敛结论**：若目标函数是凸且满足 `L`-光滑性，梯度下降在合适步长下可收敛到全局最优；若进一步满足 `μ`-强凸，则还能得到线性收敛率

#### 深度学习中的非凸现实

深度神经网络的损失函数几乎总是**非凸的**。这意味着：
- 存在大量局部最小值（local minima）
- 存在鞍点（saddle points）——在高维空间中，鞍点比局部最小值更常见
- 梯度下降不保证找到全局最优解

然而，实践中深度学习仍然有效，原因包括：
- **过参数化**（over-parameterization）：参数远多于数据点时，大多数局部最小值的损失值接近全局最优
- **随机性的帮助**：SGD 的噪声有助于逃离鞍点和尖锐的局部最小值
- **损失曲面的结构**：实际的损失曲面比最坏情况好得多

#### 直觉理解

凸函数的定义可以解读为：在曲线上任意两点之间的连线始终在函数之上。这样的函数没有波动、没有多余局部极小值，负梯度永远指向相同方向。非凸函数则像多山的地形，梯度沿途会震荡，鞍点和局部极小值让训练变得不确定。

#### AI 中的角色

凸优化在经典机器学习中扮演核心角色：逻辑回归、支持向量机、LASSO 等都是凸问题，方便引入正则化和对偶分析。在深度学习中，大规模网络的损失函数是非凸的，但我们仍借助凸优化的思维（正则化、对偶惩罚、高度结构化的层）来构建更稳定的训练管道。

### 3.4 损失函数景观

#### 鞍点（Saddle Points）

在 $n$ 维空间中，鞍点是 Hessian 矩阵既有正特征值又有负特征值的临界点。Dauphin et al.（2014）指出，在高维空间中，鞍点的数量远超局部最小值。

对于一个随机的临界点，每个 Hessian 特征值为正或负的概率各为 1/2。要成为局部最小值，所有 n 个特征值都必须为正，概率为 (1/2)^n——在高维中趋近于零。这里 n 是参数空间的维度。

#### 局部最小值与全局最小值

Choromanska et al.（2015）利用随机矩阵理论证明：对于足够大的网络，局部最小值的损失值集中在一个较窄的范围内，且接近全局最小值。

#### 平坦极小值（Flat Minima）

Hochreiter & Schmidhuber（1997）提出，**平坦极小值往往与更好的泛化相关**。

直觉：平坦极小值对参数的微小扰动不敏感，意味着模型在训练集和测试集上的表现更一致。但这里需要加上限定语：平坦度的定义会受到参数重缩放、归一化方式和模型重参数化影响，因此“平坦一定更好”更适合作为经验规律，而不是无条件定理。

数学上，平坦度可以用 Hessian 矩阵的特征值来衡量：特征值越小，极小值越平坦。

$$\text{平坦度} \propto \frac{1}{\max(\text{eigenvalues of } H)}$$

其中 H 是 Hessian 矩阵，最大特征值越大说明曲率越尖锐，平坦度越低。

Keskar et al.（2016）发现，大批量训练倾向于收敛到尖锐极小值，而小批量训练倾向于平坦极小值，这解释了为什么小批量 SGD 通常泛化更好。

> **代码示例**：参见 `code/visualizations/viz_gradient_descent.py`

#### 直觉理解

损失景观可以类比为山地：鞍点是过山鞍的顶点，既不是山峰也不是山谷。梯度下降在鞍点处会振荡，因此会放慢或停滞。平坦极小值相当于宽阔的山谷，随机梯度的噪声使得更新更容易在这些区域停留。理解这些直觉有助于解释为什么在实际训练中需要梯度剪裁、学习率调度以及随机扰动。

#### AI 中的角色

损失景观理解直接指导了优化实践：大模型训练中使用小批量 SGD + Dropout + 权重衰减，目的是引导训练进入平坦区域；当遇到易陷入鞍点的优化问题时，Nesterov、Adam 之类的优化器通过提前量和自适应步长帮助穿越；Loss surface 可视化工具（如 Hessian 特征值分析、linear interpolation curves）成为工程中分析训练稳定性的重要手段。

### 3.5 变分法与变分推断

#### 从变分法到变分推断

经典变分法求解泛函的极值：

$$J[y] = \int_a^b F(x, y, y') dx$$

其中 $F(x, y, y')$ 是要极小化的泛函密度，$y'$ 表示 $y$ 对 $x$ 的导数。

变分推断（variational inference）将贝叶斯推断转化为优化问题。给定观测数据 $x$，我们想求后验分布 $p(z|x)$，但直接计算通常不可行。

变分推断的核心思想：用一个简单的分布族 $q_\phi(z)$ 去逼近真实后验 $p(z|x)$，通过最小化 KL 散度：

$$\phi^* = \arg\min_\phi \text{KL}(q_\phi(z) \| p(z|x))$$

其中 $q_\phi(z)$ 是可训练的近似分布，$p(z|x)$ 是真实后验，而 KL 散度衡量两个分布的差异。

等价于最大化**证据下界（ELBO, Evidence Lower Bound）**：

$$\text{ELBO}(\phi) = \mathbb{E}_{q_\phi(z)}[\log p(x, z) - \log q_\phi(z)]$$

其中期望是关于近似后验分布计算的，log p(x, z) 是联合对数似然，log q(z) 是近似后验的对数密度。

#### 变分自编码器（VAE）

Kingma & Welling（2013）提出的 VAE 是变分推断在深度学习中最成功的应用：

$$\mathcal{L}(\theta, \phi; x) = -\text{KL}(q_\phi(z|x) \| p(z)) + \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(x|z)]$$

其中 $q_\phi(z|x)$ 是编码器输出的近似后验，$p(z)$ 是先验，$p_\theta(x|z)$ 是解码器给定 $z$ 的生成分布。

第一项是正则化项（让编码分布接近先验），第二项是重构项（让解码器能还原输入）。

**重参数化技巧（reparameterization trick）**：为了让梯度能通过随机采样传播，将采样过程重写为确定性变换加上独立噪声：

$$z = \mu + \sigma \cdot \epsilon, \quad \epsilon \sim \mathcal{N}(0, 1)$$

其中 $\mu$、$\sigma$ 是编码器输出的均值和标准差，$\epsilon$ 是来自标准正态的噪声，重参数化将随机抽样转换成可导的确定性操作。

这样梯度就可以对 $\mu$ 和 $\sigma$ 求导，使得整个模型可以端到端训练。

#### 直觉理解

变分推断的直觉是利用一个"容易优化"的分布族来近似真实后验，ELBO 的第一项相当于惩罚偏离先验的距离，第二项相当于让生成模型重构输入的能力，重参数化将随机性截流在前向传播之外，确保反向传播只穿越可导路径。

#### AI 中的角色

VAE 是变分推断在 AI 中最直接、也最标准的应用：编码器、解码器和 KL 项共同构成一个可训练的概率生成模型。更广泛地说，变分思想也影响了现代生成模型与近似后验学习，但要注意边界：BERT 的 MLM 目标不是标准的变分推断，扩散模型则只在某些推导中可写成变分下界。因此，更稳妥的说法是，变分法为现代 AI 提供了“把难解推断问题改写成可优化目标”的方法论，而不是所有生成模型都直接等价于经典变分推断。

---

## 4. 对 AI 的核心贡献

### 4.1 训练范式：从不可能到可能

微积分对 AI 最根本的贡献是**让神经网络可训练**。在反向传播被广泛采用之前，神经网络的参数调整几乎是盲目的。链式法则 + 计算图的组合，使得即使是数十亿参数的模型也能高效计算梯度。

**自动微分（Automatic Differentiation）**：现代深度学习框架（PyTorch、TensorFlow、JAX）的核心就是自动微分引擎。它不是符号微分（表达式膨胀），也不是数值微分（精度差），而是通过计算图精确高效地计算梯度。

- **前向模式（Forward Mode）**：适合输入少、输出多的情况
- **反向模式（Reverse Mode）**：适合输入多、输出少的情况——正好是神经网络的场景（百万参数，一个标量损失）

### 4.2 优化算法：训练效率的关键

优化器的选择直接影响：
- **收敛速度**：Adam 通常比 vanilla SGD 快数倍
- **泛化性能**：SGD + Momentum 在某些任务上泛化更好
- **训练稳定性**：学习率预热（warmup）和衰减策略至关重要

**大模型训练中的优化技巧**：
- **梯度累积（Gradient Accumulation）**：模拟大批量训练
- **梯度裁剪（Gradient Clipping）**：防止梯度爆炸
- **混合精度训练（Mixed Precision）**：FP16 前向 + FP32 梯度累积
- **学习率调度**：余弦退火（cosine annealing）、线性预热等

### 4.3 损失函数设计

损失函数是微积分与具体任务之间的桥梁：

| 任务 | 损失函数 | 数学形式 |
|------|----------|----------|
| 回归 | MSE | $L = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$ |
| 二分类 | 二元交叉熵 | $L = -[y\log\hat{y} + (1-y)\log(1-\hat{y})]$ |
| 多分类 | 交叉熵 | $L = -\sum_c y_c \log \hat{y}_c$ |
| 生成模型 | 对抗损失 | $\min_G \max_D \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$ |
| 对比学习 | InfoNCE | $L = -\log \frac{\exp(\text{sim}(z_i, z_j)/\tau)}{\sum_k \exp(\text{sim}(z_i, z_k)/\tau)}$ |

### 4.4 二阶方法与未来方向

一阶方法（只用梯度）主导了当前的深度学习，但二阶方法（利用 Hessian 信息）有更好的理论收敛性：

- **Newton 法**：利用 Hessian 逆矩阵进行二次收敛更新，但计算代价为立方级
- **拟 Newton 法（L-BFGS）**：近似 Hessian 逆，在小模型上有效
- **自然梯度（Natural Gradient）**：使用 Fisher 信息矩阵代替 Hessian
- **K-FAC（2015）**：Kronecker 分解近似 Fisher 矩阵，使自然梯度在深度网络中可行

---

## 5. 前沿与开放问题

### 5.1 为什么过参数化的网络能泛化？

经典统计学习理论预测，参数远多于数据的模型应该严重过拟合。但深度网络违反了这一预测。**双下降现象（double descent）**（Belkin et al., 2019）表明，在插值阈值之后，增加模型容量反而改善泛化。这挑战了传统的偏差-方差权衡理论。

### 5.2 SGD 的隐式正则化

SGD 不仅仅是一个优化算法，它还隐式地偏好某些解。研究表明：
- SGD 倾向于找到最大间隔解（类似 SVM）
- 小批量 SGD 的噪声起到正则化作用
- 学习率的大小影响找到的解的"平坦度"

### 5.3 神经切线核（Neural Tangent Kernel）

Jacot et al.（2018）发现，在无限宽度极限下，神经网络的训练动态等价于一个核方法。这为理解梯度下降在神经网络中的行为提供了理论框架，但对有限宽度网络的适用性仍有争议。

### 5.4 优化与泛化的统一理论

目前缺乏一个统一的理论来解释：
- 为什么特定的优化轨迹导致好的泛化
- 损失曲面的几何结构如何影响学习
- 不同优化器找到的解有什么本质区别

### 5.5 大模型时代的优化挑战

- **训练不稳定性**：大模型训练中的 loss spike 问题
- **超参数转移**：如何将小模型的最优超参数转移到大模型（$\mu$P, Yang et al., 2022）
- **分布式优化**：数据并行、模型并行、流水线并行中的优化一致性
- **零阶优化**：当梯度不可用时（如 RLHF 中的奖励模型），如何高效优化

---

## 6. 推荐阅读与参考文献

### 经典教材

- Boyd, S. & Vandenberghe, L. (2004). *Convex Optimization*. Cambridge University Press. — 凸优化的标准教材，免费在线版本。
- Nocedal, J. & Wright, S. (2006). *Numerical Optimization*. Springer. — 数值优化的权威参考。
- Goodfellow, I., Bengio, Y. & Courville, A. (2016). *Deep Learning*. MIT Press. — 第 4 章（数值计算）和第 8 章（优化）。

### 关键论文

- Rumelhart, D., Hinton, G. & Williams, R. (1986). Learning representations by back-propagating errors. *Nature*, 323, 533-536.
- Kingma, D. & Ba, J. (2014). Adam: A Method for Stochastic Optimization. *arXiv:1412.6980*.
- Kingma, D. & Welling, M. (2013). Auto-Encoding Variational Bayes. *arXiv:1312.6114*.
- Dauphin, Y. et al. (2014). Identifying and attacking the saddle point problem in high-dimensional non-convex optimization. *NeurIPS*.
- Keskar, N. et al. (2016). On Large-Batch Training for Deep Learning: Generalization Gap and Sharp Minima. *arXiv:1609.04836*.
- Belkin, M. et al. (2019). Reconciling modern machine learning practice and the bias-variance trade-off. *PNAS*.
- Jacot, A., Gabriel, F. & Hongler, C. (2018). Neural Tangent Kernel: Convergence and Generalization in Neural Networks. *NeurIPS*.
- Yang, G. et al. (2022). Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer. *arXiv:2203.03466*.
- Polyak, B. T. (1964). Some Methods of Speeding Up the Convergence of Iteration Methods. *USSR Computational Mathematics and Mathematical Physics*, 4(5), 1-17.
- Sutskever, I., Martens, J., Dahl, G. & Hinton, G. (2013). On the importance of initialization and momentum in deep learning. *ICML*.
- Choromanska, A., Henaff, M., Mathieu, M., Arous, G. B. & LeCun, Y. (2015). The loss surfaces of multilayer networks. *AISTATS*.

### 在线资源

- Stanford CS229 机器学习课程笔记（优化部分）
- Distill.pub 上关于优化器的可视化文章
- Sebastian Ruder (2016). An overview of gradient descent optimization algorithms. *arXiv:1609.04747*. — 优化器综述的经典博文。

## 7. 本篇在全书中的位置

这一篇位于“数学基础如何真正变成可训练 AI 系统”的关键中间层：

- [[02-linear-algebra|线性代数]] 负责把模型写成向量、矩阵和张量运算；
- 本篇负责解释这些运算何时可微、梯度如何计算、参数如何更新；
- [[05-approximation-theory|逼近论]] 讨论模型具备怎样的表达能力与理论边界；
- [[11-numerical-analysis|数值分析]] 则进一步追问实际实现中的稳定性、误差与大规模计算问题。

因此，本篇最核心的任务不是罗列优化器名称，而是说明一条完整链路：可微结构让反向传播成为可能，优化理论让训练过程可执行，二者合在一起才构成深度学习的工程数学基础。

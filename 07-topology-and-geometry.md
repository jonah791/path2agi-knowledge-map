---
title: 拓扑与几何
aliases:
  - Topology and Geometry
category:
  - 数学与形式基础
tags:
  - ai-foundations
  - math
  - topology
  - geometry
type: topic
status: stable
importance: important
version: v2.0
date: '2026-04-08'
---

# 拓扑学与微分几何（Topology and Differential Geometry）：从起源到 AI 的完整脉络

> **上帝视角**：拓扑学和微分几何共同研究数据的“形状”，但关注点并不相同。拓扑更关心连通性、洞、等价类这类在连续变形下不变的结构；几何更关心距离、角度、曲率与测地线。流形假设、拓扑数据分析和信息几何，正是这两条线索在现代 AI 中最常见的汇合点。

---

## 相关主题

- [[02-linear-algebra|线性代数]]：切空间、谱分解与局部线性近似都依赖线性代数
- [[03-calculus-and-optimization|微积分与优化理论]]：测地线、自然梯度与流形上的变化都需要微积分语言
- [[04-information-theory|信息论]]：KL 散度、Fisher 信息与信息几何直接相连
- [[06-graph-theory|图论]]：图论处理离散关系结构，本篇处理连续空间中的流形、曲率与拓扑不变量
- [[16-neuroscience|神经科学]]：神经表征空间的几何组织常借助流形视角来理解

## 1. 上帝视角：为什么 AI 需要拓扑学与几何

现代机器学习面对的核心挑战之一是**高维数据**。一张 $256 \times 256$ 的灰度图像就是 $65536$ 维空间中的一个点，但所有"有意义"的图像只占据这个巨大空间中极其微小的一部分。拓扑学和微分几何提供了理解这种结构的数学语言：

- **流形假设（Manifold Hypothesis）**：高维数据实际上集中在低维流形附近，降维、表示学习、生成模型的理论根基
- **曲率与度量（Curvature and Metric）**：概率分布空间本身具有黎曼几何结构，自然梯度下降利用这一结构加速优化
- **拓扑不变量（Topological Invariants）**：数据的"洞"、"连通分量"等拓扑特征对噪声鲁棒，可作为特征工程的工具

### 1.1 拓扑负责不变量，几何负责度量与曲率

如果只用一句话区分两者：

- **拓扑学**问的是：连续变形以后，哪些结构仍然不变？
- **几何学**问的是：这个空间里距离怎么量、曲率怎样变化、最短路径怎么走？

在 AI 中，这种分工非常实用：

- 当我们关心“数据是否落在同一连通分量、是否存在环状结构、噪声会不会破坏整体形状”时，更接近拓扑问题；
- 当我们关心“表示空间里的距离是否有意义、沿哪个方向更新更自然、概率分布之间的局部变化如何度量”时，更接近几何问题。

流形学习和几何深度学习通常处在两者的交界处：拓扑告诉我们全局形状不该被轻易破坏，几何告诉我们局部距离和方向如何被保留。

### 1.2 与其他学科的关键连接

| 学科 | 连接点 | 具体体现 |
|------|--------|----------|
| 线性代数 | 切空间是线性空间 | 流形上的局部线性化、Jacobian 矩阵 |
| 概率论 | 概率分布构成流形 | 统计流形、Fisher 信息度量 |
| 信息论 | KL 散度与几何距离 | 信息几何、α-散度族 |
| 微积分与优化 | 流形上的梯度下降 | 黎曼优化、自然梯度 |
| 图论 | 离散结构与连续形状形成互补 | 图上的关系结构与流形上的形状结构相互补充 |
| 物理学 | 规范场论与纤维丛 | 等变神经网络、几何深度学习 |

---

## 2. 历史脉络

拓扑学与微分几何的发展横跨近三个世纪，从纯粹的数学好奇心演变为 AI 的核心工具。

### 2.1 古典时期：拓扑与几何的分化起点

**Euler (1758)：多面体公式**

Leonhard Euler 对凸多面体提出了著名关系式：

$$
V - E + F = 2
$$

这就是 Euler 公式（后推广为 Euler 示性数），其中 $V$ 是顶点数，$E$ 是边数，$F$ 是面数。它的重要性在于：即使多面体被连续形变，这个量仍保持不变，因此它是最早被系统识别出的拓扑不变量之一。

**Gauss (1827)：内蕴几何**

Carl Friedrich Gauss 在《关于曲面的一般研究》（*Disquisitiones generales circa superficies curvas*）中提出了**绝妙定理（Theorema Egregium）**：曲面的 Gauss 曲率是内蕴的，即只依赖于曲面上的度量，不依赖于曲面在三维空间中的嵌入方式。

$$
K = \frac{R_{1212}}{g_{11}g_{22} - g_{12}^2}
$$

这一思想深刻影响了后来的黎曼几何和广义相对论。

### 2.2 黎曼几何的建立

**Riemann (1854)：黎曼几何**

Bernhard Riemann 在哥廷根大学的就职演讲《论作为几何学基础的假设》（*Über die Hypothesen, welche der Geometrie zu Grunde liegen*）中，将几何学从二维曲面推广到任意维度的流形。核心概念是**黎曼度量张量**：

$$
ds^2 = \sum_{i,j} g_{ij} \, dx^i \, dx^j
$$

度量张量 $g_{ij}$ 定义了流形上的距离、角度和曲率。Riemann 的这套语言后来被 Einstein 的广义相对论和 Rao、Amari 的信息几何分别继承并发展。

### 2.3 拓扑学的系统化

**Poincaré (1895)：代数拓扑**

Henri Poincaré 在《位置分析》（*Analysis Situs*）中创立了代数拓扑学，引入了：

- **基本群（Fundamental Group）**：通常记为 π₁(X)，描述空间中"洞"的代数结构
- **同调群（Homology Groups）**：通常记为 Hₙ(X)，用代数方法刻画拓扑空间的"洞"
- **Betti 数**：通常记为 βₙ，其中 β₀ 是连通分量数，β₁ 是"环"的数量，β₂ 是"空腔"的数量

这些工具在 21 世纪被拓扑数据分析（TDA）重新发现并应用于机器学习。

### 2.4 现代发展：嵌入与流形

**Whitney (1936)：嵌入定理**

Hassler Whitney 证明了任何 $n$ 维光滑流形都可以嵌入到 $\mathbb{R}^{2n}$ 中。这个定理的 AI 意义在于：如果数据分布在 $d$ 维流形上，那么 $2d$ 维的表示空间就足以忠实地保留其结构。

$$
\text{Whitney 嵌入定理：} M^n \hookrightarrow \mathbb{R}^{2n}
$$

**Nash (1956)：等距嵌入定理**

John Nash 证明了任何黎曼流形都可以等距嵌入到足够高维的欧几里得空间中。这意味着流形上的内蕴几何信息可以完全由嵌入来表达。

### 2.5 计算时代：流形学习的兴起

**Tenenbaum, de Silva & Langford (2000)：Isomap**

Joshua Tenenbaum 等人在 *Science* 上发表了 Isomap 算法，这是第一个系统性的非线性降维方法。核心思想：用图上的最短路径（测地距离）替代欧几里得距离。

**Roweis & Saul (2000)：LLE**

同期发表的局部线性嵌入（Locally Linear Embedding）从另一个角度实现流形学习：假设每个点可以由其近邻线性表示，在低维空间中保持这种线性关系。

**van der Maaten & Hinton (2008)：t-SNE**

t-分布随机邻域嵌入（t-SNE）通过概率分布匹配实现降维，特别擅长保持局部结构，成为高维数据可视化的标准工具。

**McInnes, Healy & Melville (2018)：UMAP**

统一流形近似与投影（UMAP）基于黎曼几何和模糊拓扑理论，在速度和全局结构保持上超越了 t-SNE。

### 2.6 深度学习时代

**Amari (1998)：自然梯度**

Shun-ichi Amari 将信息几何真正推入机器学习核心语境。自然梯度的关键思想是：参数更新不应只看欧几里得坐标里的步长，还应看分布空间里真正走了多远。

**Bronstein et al. (2021)：几何深度学习**

Michael Bronstein 等人系统提出“几何深度学习”框架，强调数据域的对称性、度量与几何约束应直接进入模型架构。这里的重点不再只是“图”，而是更一般的几何归纳偏置。

---

## 3. 核心知识点详解

### 3.1 流形假设（Manifold Hypothesis）

#### 数学定义

一个 $d$ 维**拓扑流形**（topological manifold）$M$ 是一个 Hausdorff 拓扑空间，满足：
- 每个点 p ∈ M 都有一个邻域同胚于 d 维欧几里得空间
- $M$ 有可数基

如果转移映射（transition maps）是光滑的，则 $M$ 是**光滑流形**（smooth manifold）。

**流形假设**的表述：设 X 是嵌入在高维空间中的数据集，则存在一个远低于环境维度的低维流形 M，使得数据点近似分布在 M 上或其附近。

$$
\mathcal{X} \approx \{x \in \mathbb{R}^D : x \in M^d + \epsilon, \; \epsilon \sim \mathcal{N}(0, \sigma^2 I)\}
$$

其中：
- $\mathcal{X}$ 表示观测到的高维数据集
- $M^d$ 表示嵌入在高维空间中的 $d$ 维流形
- $\epsilon$ 表示围绕流形的噪声扰动
- $\sigma^2 I$ 表示各向同性高斯噪声的协方差结构

#### 直觉理解

想象一张纸（二维流形）被揉成一团扔进三维空间。虽然纸团占据了三维空间，但纸本身仍然是二维的。流形学习的目标就是把这张纸"展开"回二维。

Swiss Roll 数据集是最经典的例子：三维空间中的螺旋卷曲曲面，本质上是二维的。

#### AI 中的角色

- **自编码器（Autoencoder）**：编码器学习从高维空间到低维流形的映射，解码器学习逆映射
- **生成对抗网络（GAN）**：生成器学习从低维噪声空间到数据流形的映射
- **扩散模型（Diffusion Model）**：在数据流形上定义前向/逆向扩散过程

### 3.2 流形学习（Manifold Learning）

流形学习是一类非线性降维方法，目标是从高维数据中恢复低维流形结构。

#### 3.2.1 Isomap

**核心思想**：用测地距离（geodesic distance）替代欧几里得距离。

算法步骤：
1. 构建 $k$-近邻图，边权为欧几里得距离
2. 用 Dijkstra 或 Floyd-Warshall 算法计算所有点对之间的最短路径距离 $D_G$
3. 对距离矩阵应用多维缩放（MDS）

$$
\text{MDS: } \min_Y \sum_{i,j} \left( D_G(i,j) - \|y_i - y_j\| \right)^2
$$

等价于对双中心化矩阵做特征值分解：

$$B = -\frac{1}{2} J D_G^2 J$$

其中

$$J = I - \frac{1}{n}\mathbf{1}\mathbf{1}^T$$

再取前 d 个最大特征值对应的特征向量。

**优点**：保持全局测地距离结构
**缺点**：对噪声和短路边敏感，计算复杂度 $O(n^3)$

#### 3.2.2 局部线性嵌入（LLE）

**核心思想**：假设流形局部是线性的，每个点可以由其近邻线性重构。

算法步骤：
1. 对每个点找到 k 个近邻
2. 求重构权重，并最小化下式：

   $$\sum_i \|x_i - \sum_j W_{ij} x_j\|^2$$

3. 在低维空间中保持相同的权重，并最小化下式：

   $$\sum_i \|y_i - \sum_j W_{ij} y_j\|^2$$

$$
\min_Y \text{tr}(Y^T M Y), \quad M = (I - W)^T(I - W)
$$

约束 $Y^T Y = I$，解为 $M$ 的最小非零特征值对应的特征向量。

#### 3.2.3 t-SNE

**核心思想**：在高维和低维空间中分别定义点对之间的概率分布，最小化两个分布的 KL 散度。

高维空间中的条件概率：

$$
p_{j|i} = \frac{\exp(-\|x_i - x_j\|^2 / 2\sigma_i^2)}{\sum_{k \neq i} \exp(-\|x_i - x_k\|^2 / 2\sigma_i^2)}
$$

对称化：
$$p_{ij} = \frac{p_{j|i} + p_{i|j}}{2n}$$

低维空间中使用 **t 分布**（自由度为 1，即 Cauchy 分布）：

$$
q_{ij} = \frac{(1 + \|y_i - y_j\|^2)^{-1}}{\sum_{k \neq l} (1 + \|y_k - y_l\|^2)^{-1}}
$$

目标函数：

$$
C = KL(P \| Q) = \sum_{i \neq j} p_{ij} \log \frac{p_{ij}}{q_{ij}}
$$

使用 t 分布而非高斯分布的关键原因：t 分布的重尾特性缓解了"拥挤问题"（crowding problem），使得低维空间中中等距离的点不会被压缩到一起。

#### 3.2.4 UMAP

**核心思想**：基于黎曼几何和模糊集合论，构建高维和低维的模糊拓扑表示，最小化交叉熵。

UMAP 将每个数据点的局部距离归一化，使得每个点"看到"的局部几何是一致的（类似于黎曼流形上的局部坐标）。然后用模糊集合的交运算合并局部信息，得到全局的模糊拓扑表示。

$$
\mu(x_i, x_j) = \exp\left(-\frac{d(x_i, x_j) - \rho_i}{\sigma_i}\right)
$$

其中 $\rho_i$ 是到最近邻的距离，$\sigma_i$ 通过固定每个点的有效近邻数来确定。

**相比 t-SNE 的优势**：速度更快、全局结构保持更好、理论基础也更扎实。

#### 直觉理解

流形学习的共同目标是把“高维空间中弯曲、折叠的数据片”重新摊开。Isomap强调保住沿流形走的距离，LLE强调保住局部线性关系，t-SNE/UMAP则更重视局部邻域在低维空间中的可视分离。

#### AI 中的角色

- **表示可视化**：用 t-SNE、UMAP 观察模型隐藏层是否形成语义簇
- **降维预处理**：在高维小样本任务中减少噪声和冗余维度
- **表示几何诊断**：帮助判断表征空间是按类别、任务还是域在组织

### 3.3 持续同调与拓扑数据分析（TDA）

#### 单纯复形（Simplicial Complex）

单纯复形是拓扑空间的组合近似。一个 $k$-单纯形是 $k+1$ 个点的凸包：
- 0-单纯形：点
- 1-单纯形：边
- 2-单纯形：三角形
- 3-单纯形：四面体

从点云数据构建单纯复形的常用方法：

**Vietoris-Rips 复形**：给定阈值 $\epsilon$，如果点集 $\{x_0, \ldots, x_k\}$ 中任意两点的距离 $\leq \epsilon$，则加入对应的 $k$-单纯形。

$$
\text{VR}_\epsilon = \{ \sigma \subseteq X : \text{diam}(\sigma) \leq \epsilon \}
$$

#### 持续同调（Persistent Homology）

核心问题：如何选择阈值 $\epsilon$？持续同调的回答是——不选择，而是观察所有尺度。

让 $\epsilon$ 从 $0$ 增长到 $\infty$，得到一个嵌套的复形序列（**滤流**，filtration）：

$$
\emptyset = K_0 \subseteq K_1 \subseteq \cdots \subseteq K_m = K
$$

在这个过程中，拓扑特征（连通分量、环、空腔）会"诞生"和"死亡"。记录每个特征的诞生时间 $b$ 和死亡时间 $d$，得到**持续图**（persistence diagram）：

$$
\text{Dgm} = \{(b_i, d_i)\}_{i=1}^N \subset \{(b, d) : 0 \leq b \leq d\}
$$

其中：
- $(b_i, d_i)$ 表示第 $i$ 个拓扑特征的诞生与死亡尺度
- $N$ 表示被记录的拓扑特征数量
- 特征诞生得越早、持续时间越长，通常说明该结构越稳定、越不容易由噪声解释

**持续性**（persistence）$d_i - b_i$ 衡量特征的"重要性"：持续时间长的特征反映真实的拓扑结构，短暂的特征通常是噪声。

#### 直觉理解

持续同调不是在某一个阈值上拍板“这个洞存在还是不存在”，而是追踪结构在不同尺度下能存活多久。真正稳固的几何结构会跨越多个尺度持续存在，噪声则会很快出生又死亡。

#### AI 中的角色

- **特征工程**：将持续图转化为向量（持续景观、持续图像），输入传统机器学习模型
- **损失函数**：拓扑损失（topological loss）惩罚生成数据与真实数据的拓扑差异
- **结构鲁棒特征**：用持续同调提取对尺度变化和噪声更稳健的形状特征
### 3.4 信息几何（Information Geometry）

信息几何用黎曼几何的语言研究概率分布空间，由 Rao (1945) 和 Amari (1985) 奠基。

#### 为什么概率分布也能看成流形？

关键不是“分布看起来像几何对象”，而是很多常见分布族都由一组连续参数刻画。例如 Bernoulli 分布

$$
p_\theta(x) = \theta^x(1-\theta)^{1-x}, \quad \theta \in (0,1)
$$

只需要一个参数 $\theta$，因此它本身就形成了一条一维曲线；高斯分布族则由均值和方差参数化，形成二维参数曲面。只要参数变化是光滑的，我们就可以把这类分布族看作流形，并在上面讨论距离、曲率与最速下降方向。

#### 统计流形（Statistical Manifold）

一个参数化的概率分布族会构成一个 d 维流形，而参数 θ 可以看作这张流形上的局部坐标。

#### Fisher 信息矩阵

Fisher 信息矩阵是统计流形上的自然黎曼度量：

$$
g_{ij}(\theta) = \mathbb{E}_{p(x;\theta)}\left[\frac{\partial \log p(x;\theta)}{\partial \theta_i} \frac{\partial \log p(x;\theta)}{\partial \theta_j}\right]
$$

等价形式：

$$
g_{ij}(\theta) = -\mathbb{E}_{p(x;\theta)}\left[\frac{\partial^2 \log p(x;\theta)}{\partial \theta_i \partial \theta_j}\right]
$$

Fisher 信息矩阵的几何意义：它度量了参数空间中"无穷小距离"对应的分布变化量。两个相近参数 $\theta$ 和 $\theta + d\theta$ 对应的分布之间的 KL 散度为：

$$
KL(p_\theta \| p_{\theta + d\theta}) \approx \frac{1}{2} \sum_{ij} g_{ij} \, d\theta_i \, d\theta_j = \frac{1}{2} d\theta^T G(\theta) \, d\theta
$$

#### 自然梯度（Natural Gradient）

普通梯度下降在参数空间中沿最速下降方向移动，但参数空间的欧几里得度量并不反映分布空间的真实几何。

**自然梯度**（Amari, 1998）使用 Fisher 信息矩阵作为度量：

$$
\tilde{\nabla}_\theta L = G(\theta)^{-1} \nabla_\theta L
$$

直觉：自然梯度在**分布空间**（而非参数空间）中沿最速下降方向移动。

**AI 中的应用**：
- **K-FAC**（Kronecker-Factored Approximate Curvature）：近似 Fisher 信息矩阵，加速深度网络训练
- **TRPO / PPO**：信赖域策略优化用 KL 散度约束策略更新步长，本质上是信息几何的应用
- **变分推断**：在分布流形上优化 ELBO

#### 直觉理解

普通梯度只告诉我们“参数该往哪走”，信息几何进一步追问“这一步在分布意义上走了多远”。自然梯度因此更像是在概率分布空间中量尺一致地前进，而不是在参数坐标里盲目前冲。

#### AI 中的角色

- **优化器设计**：自然梯度和 Fisher 近似帮助训练更稳定
- **策略更新约束**：强化学习里用 KL 距离控制策略漂移
- **概率模型训练**：为变分推断、能量模型等提供几何解释

#### α-联络与对偶结构

Amari 引入了 $\alpha$-联络族，揭示了统计流形上的对偶几何结构：

$$
\Gamma_{ij,k}^{(\alpha)} = \mathbb{E}\left[\left(\partial_i \partial_j \ell + \frac{1-\alpha}{2} \partial_i \ell \, \partial_j \ell\right) \partial_k \ell\right]
$$

其中 ℓ 表示对数似然。α=1 对应指数族的自然联络，α=-1 对应混合族的联络。α 与 -α 联络互为对偶，这种对偶性统一了 EM 算法、变分推断等方法的几何解释。

---

## 4. 对 AI 的核心贡献

### 4.1 表示学习的几何视角

深度神经网络可以理解为一系列流形变换。每一层将输入流形映射到新的流形，逐步"展开"数据的纠缠结构，使得最终的表示空间中不同类别线性可分。

$$
f = f_L \circ f_{L-1} \circ \cdots \circ f_1 : \mathcal{M}_{\text{data}} \to \mathcal{M}_{\text{repr}}
$$

ResNet 的残差连接 $f_l(x) = x + g_l(x)$ 可以理解为流形上的微小形变，这与微分同胚（diffeomorphism）的概念密切相关。Neural ODE 将这一思想推到极致，用连续的常微分方程描述流形变换。

### 4.2 几何深度学习的统一框架

Bronstein et al. (2021) 在《Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges》中提出了 5G 框架。对本篇来说，更关键的是其中关于“测地线、流形与规范”的连续几何视角：

| 域 | 对称群 | 网络架构 |
|----|--------|----------|
| 网格（Grids） | 平移群 | CNN |
| 群（Groups） | 一般群 | 群等变网络 |
| 测地线（Geodesics） | 等距群 | 流形网络 |
| 规范（Gauges） | 规范群 | 规范等变网络 |

图结构部分已在 [[06-graph-theory|图论]] 专篇展开；本篇保留的是连续空间几何如何进入模型设计这条主线。核心原则仍然是：**对称性决定架构**。

### 4.3 优化的几何结构

损失函数的景观（loss landscape）本身具有丰富的几何结构：

- **鞍点**：高维空间中，鞍点远多于局部极小值，这是拓扑的必然结果
- **平坦极小值**：与泛化性能相关，可以用 Hessian 矩阵的特征值（曲率）来刻画
- **模式连通性**（Mode Connectivity）：不同的局部极小值之间存在低损失的路径，这是损失景观的拓扑性质

### 4.4 生成模型的流形视角

- **VAE**：编码器将数据映射到潜在流形，解码器从潜在流形生成数据
- **Normalizing Flow**：通过一系列可逆变换（微分同胚）将简单分布映射到复杂分布
- **扩散模型**：在数据流形上定义随机过程，正向过程逐步破坏结构，逆向过程逐步恢复

---

## 5. 前沿与开放问题

### 5.1 拓扑深度学习

将深度学习从图（1-单纯形）推广到更高阶的拓扑结构：
- **单纯复形神经网络**（Simplicial Neural Networks）：在单纯复形上定义消息传递
- **胞腔复形网络**（Cell Complex Networks）：更灵活的拓扑结构
- **高阶结构学习**：处理二元边之外的多体交互与复合关系

### 5.2 流形上的扩散模型

在黎曼流形上定义扩散过程，生成具有特定几何约束的数据：
- 分子构象生成（SE(3) 等变）
- 蛋白质结构预测
- 机器人运动规划（李群上的扩散）

### 5.3 神经网络的拓扑复杂度

用拓扑工具分析神经网络的表达能力：
- 决策边界的 Betti 数与网络深度/宽度的关系
- 网络权重空间的拓扑结构
- 损失景观的持续同调分析

### 5.4 开放问题

- **流形假设的验证**：真实数据是否真的分布在低维流形上？还是更复杂的分层结构？
- **曲率与泛化**：数据流形的曲率如何影响学习的难度和泛化能力？
- **拓扑正则化**：如何有效地将拓扑约束融入深度学习的训练过程？
- **可扩展的 TDA**：持续同调的计算复杂度如何降低到大规模数据可用的程度？

---

## 6. 推荐阅读与参考文献

### 经典教材

- do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser. — 黎曼几何的标准教材
- Munkres, J. R. (2000). *Topology*. Prentice Hall. — 点集拓扑的经典入门
- Hatcher, A. (2002). *Algebraic Topology*. Cambridge University Press. — 代数拓扑的现代教材（免费在线）
- Lee, J. M. (2012). *Introduction to Smooth Manifolds*. Springer. — 光滑流形的全面介绍

### 关键论文与综述

- Amari, S. (2016). *Information Geometry and Its Applications*. Springer. — 信息几何的权威著作
- Amari, S. (1998). Natural gradient works efficiently in learning. *Neural Computation*, 10(2), 251-276.
- Rao, C. R. (1945). Information and the accuracy attainable in the estimation of statistical parameters. *Bulletin of the Calcutta Mathematical Society*, 37, 81-91.

### 流形学习

- Tenenbaum, J. B., de Silva, V., & Langford, J. C. (2000). A global geometric framework for nonlinear dimensionality reduction. *Science*, 290(5500), 2319-2323.
- Roweis, S. T., & Saul, L. K. (2000). Nonlinear dimensionality reduction by locally linear embedding. *Science*, 290(5500), 2323-2326.
- van der Maaten, L., & Hinton, G. (2008). Visualizing data using t-SNE. *Journal of Machine Learning Research*, 9, 2579-2605.
- McInnes, L., Healy, J., & Melville, J. (2018). UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction. *arXiv:1802.03426*.

### 几何深度学习

- Bronstein, M. M., Bruna, J., Cohen, T., & Veličković, P. (2021). Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges. *arXiv:2104.13478*.
- Cohen, T. S., & Welling, M. (2016). Group equivariant convolutional networks. *ICML 2016*.

### 拓扑数据分析

- Edelsbrunner, H., & Harer, J. (2010). *Computational Topology: An Introduction*. AMS. — TDA 的数学基础
- Carlsson, G. (2009). Topology and data. *Bulletin of the AMS*, 46(2), 255-308.
- Hensel, F., Moor, M., & Rieck, B. (2021). A survey of topological machine learning methods. *Frontiers in Artificial Intelligence*, 4, 681108.

## 7. 本篇在全书中的位置

这一篇位于全书中“从代数与优化转向空间结构”的位置。它讨论的不是单个公式如何计算，而是数据与模型所在空间本身具有什么形状。

- [[02-linear-algebra|线性代数]] 处理局部线性表示与矩阵运算；
- [[03-calculus-and-optimization|微积分与优化理论]] 处理可微变化与参数更新；
- [[06-graph-theory|图论]] 先处理离散关系结构；
- 本篇进一步追问连续表示空间有没有流形结构、拓扑不变量与几何约束；
- [[04-information-theory|信息论]] 和 [[09-causal-inference|因果推断]] 则分别从信息结构与机制结构补上另外两种“非纯几何”的组织方式。

因此，本篇最适合被理解为一座桥：它把抽象的空间语言带入现代 AI，让我们不再只问“参数是多少”，而开始问“表示空间长什么样、哪些结构该保留、哪些变化才算自然”。

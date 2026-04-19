
# Idea 
Wichtig zu verstehen ist, das es nicht darum geht was auf den Karten steht sonders es geht nur um das bewertungskriterium also. Der AI lernt also was für dich bedeutet die Kartekarte mit $Easy$ zu bewerten  zb. Daraus generiert er dann ein Intervall wann du wieder die Karteikaren anschauen sollst. 



## Forgetting Curve (Retrievability)

- Wir modillieren eine Funktion die, an einem gegebenen Zeitpunkt $t$ ein Wahrheitswert ausgibt welcher anzeigt wie wahrscheinlich du die Karteikarte noch nicht vergessen hast. zb. ein Retrievability von 0 würde anzeigen, dass du die karte vergessen hast. 

Die Formel lautet: 
$$
R = (1 + fac * \frac{t}{S})^{-w_{20}}
$$
$$
fac = 0.9 ^{-\frac{1}{w_{20}}} - 1
$$

- $w_{20}$ ist ein optimierbares Gewicht welche anfangs vom User definiert wird. 
- Normalweise gilt $w_{20} \in [0.1, 0.8]$ Für die meisten User aber weniger als $0.2$ 

# Intervals

- Die Generierung von *optimalen* Intervalls ist das Ziel des Algorithmuses. 
- Ein Intervall ist optimal wenn es based on the desired Rentation den richtigen Wert gibt. Also basically ein Intervall ist optimal wenn mir die Karte wieder angezeigt wird. Sobald ich davon $dr$-Prozent vergessen habe.
- Oft wird ein sogennater *fuzz* Value verwendet. Also eine kleine Entropy welche verhindert dass eine feste Reihenfolge erlernt wird. 

$$
I(DR,S) = \frac{S}{0.9^{-\frac{1}{w_20}} - 1} *(DR^{-\frac{1}{w_{20}}} - 1)
$$
* DR ist die sog. **desired retention** Normalerweise 0.9 dann löst sich das intervall nach S auf. 
# Grade 
- Grade beschreibt das User feedback was zum lernen verwendet wird. 
- Normalerweise gibt es **Again**, **Hard**, **Good**, **Easy**. Daraus wird unteranderem die Stability und die Difficulty berechnet. 

# Difficulty 
- Beschreibt wie schwer ein Grade ist also bassically versucht er zu lernen wie schwer persönlich der Wert Easy für dich war. Also wie gut du das kannst. 

## Initiale Difficulty $D_0$ 

$$
D_0(G) = w_4 - e^{w_5 * (G - 1)} + 1
$$

**Wichtig** $D_0$ müssen wir danach clampen zwischen $1$ and $10$


## Die Veränderung der Difficulty $\triangle D$ 

$$
\triangle D = -w_6 *(G - 3)
$$
## Linear Damping $D^{'}$ 
- Linear Damping wird verwendet damit so näher wir an die maximale Value kommen (in unserem Fall 10) so kleiner werden die updates von $D$

$$
D^{'} = D + \triangle D * \frac{10 - D}{9}
$$
## Next Difficulty $D^{''}$ 
- Nun können wir alle Zwischenformeln zusammenfassen. 
$$
D^{''} = w_7 * D_0(4) + (1 - w_7) * D^{'}
$$
# Stability 
- Die Stability beschreibt den Change von R also wie schnell vergisst du etwas. 

$$
S^{'} = S * SInc
$$
$$
SInc = 1 + w_{15} * w_{16} * e^w_{8} * (11 - D) * S^{-w_9} * (e^{w_{10} * (1-R)} - 1)
$$

- Die Stability sagt es dass die beste Zeit zum anschauen deiner Kartekarten ist, wenn du sie fat vergessen hast. Denn so kleiner $R$  so größer $S$ 

## Stability wenn User pressed Again
$$
S^{'}(D,S,R) = min(w_{11} * D^{-w_{12}} * ((S + 1)^ {w_{13}} - 1) * e^{w_{14} * (1- R)}, S)
$$

## Shortterm Stability 

- Wird bei Same-Day Review verwendet also wenn man die Karteikarte mehrmals am Tag sieht. 
$$
S^{'} = S * e^{w_{17} * (G - 3 + w_{18}})* S^{-w_{19}}
$$

## Initial Stability 

$$
S(1) = 0.1033
$$
$$
S(2) = 0.1033
$$
$$
S(3) = 1.0978
$$
$$
S(4) = 20.3628
$$

## Optimierungen 
- Du musst die Weights optimieren. Das ist aber was für Später 


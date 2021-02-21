<h1 align="center">Zoom Commander <img height="34" width="34" src="https://user-images.githubusercontent.com/4168389/80243995-80921700-8668-11ea-90ec-e19eb6c02c75.png"> <img height="30" width="30" src="https://user-images.githubusercontent.com/4168389/80243999-81c34400-8668-11ea-94b5-ad61ef3945b7.png"></h1>

<p align="center">
  【🇬🇧 🇪🇸 🇧🇷 🇫🇷】<a href="https://github.com/desko27/zoomcommander/README.md">🇬🇧 Read</a> <a href="https://github.com/desko27/zoomcommander/readme/es.md">🇪🇸 Leer</a>
</p>

<p align="center">
  <img height="128" width="128" src="https://user-images.githubusercontent.com/4168389/90338769-53d58700-dfec-11ea-8e89-cda93da1f911.png">
</p>

<p align="center">
  🖥🎤 <strong>Ajuda prática para gerenciar o áudio e compartilhar a tela</strong>
  <br><a href="https://github.com/desko27/zoomcommander/releases/latest">⏬ Baixar agora</a>
</p>

<p align="center">
🛎 Um só clique para tudo - é sério!
<br>💡 Visão clara da reunião
<br>🤚 Arraste participantes
<br>🔍 Pesquisa facilitada
<br>✏️ Faça suas anotações
<br>... e muito mais!
</p>

![Zoom Commander](https://user-images.githubusercontent.com/4168389/90339412-e415cb00-dff0-11ea-9729-ddace3ede88f.png)

# O que é o Zoom Commander

Com o Zoom Commander você poderá entrar numa reunião e ter duas janelas diferentes funcionando ao mesmo tempo:

- O programa original Zoom.
- Um painel de controle (imagem anterior).

No painel de controle você terá funções que simplificam a gestão de um modelo de reuniões muito específico - no qual existe um presidente, uma seção do irmão designado para a parte naquele momento onde há diferentes participações e uma assistência que levanta a mão para comentar - onde todo o gerenciamento de aúdio fica com apenas uma pessoa (quer dizer, você) que muta e desmuta  conforme necessário, compartilha a tela, etc.

Por favor, se o tipo de reunião que você tem pelo Zoom não seja nesse modelo, não use Zoom Commander, pois ele foi feito para oferecer outro tipo de solução.

Vale apontar que o kit de desenvolvimento em que se baseia (Electron Zoom SDK) impõe uma série de limitações que não é possível solucionar agora. Isso não impede que o Zoom Commander te ajude, porém ao final desse documento poderá encontrar essas limitações.

# Como funciona cada seção

## A seção *Participantes*

Mostra uma lista com todos os particiapntes da reunião, incluindo você. Essa seção é parecida com a lista de participantes padrão do Zoom.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90339508-77e79700-dff1-11ea-9882-9b864e138519.png">

### Pesquisar participantes

Quando você digita o nome aqui, nenhum acento, letra maiúscula ou nomes digitados incorretamente impedirá que você encontre o participante que está buscando.

### Clique no participante

🖱 **Ativar microfone** (veja a explicação no bloco *Levantou Mão*).

<img width="250" src="https://user-images.githubusercontent.com/4168389/90340180-98662000-dff6-11ea-891a-fdc1c850056b.png">

O ícone que aparece ao colocar o mouse em cima indica a ação que vai acontecer sobre o participante que clicamos.

As ações que podemos fazer irão depender da seção onde estamos, porém sempre serão indicadas pelo ícone que veremos. Quase todas as seções permitem ações alternativas se deixarmos pressionadas alguma dessas teclas: <kbd>Ctrl</kbd> &nbsp; <kbd>Shift</kbd> &nbsp; <kbd><</kbd>

Na seção de *Participantes* todas as ações são:

🖱 Ativar microfone (veja a explicação no bloco *Levantou Mão*)
<br/><kbd>Ctrl</kbd> + 🖱 Ativar/desativar microfone (simples)
<br/><kbd><</kbd> + 🖱 Colocar na seção *Próximo designado

### Arrastar participantes

Os participantes podem ser arrastados para outras listas mencionadas mais adiante, para ter uma maior visão e controle de certos grupos.

### Botões

Algumas seções tem botões no canto superior direito.

Neste caso, ambos servem para "atualizar" a informação dos participantes. O mais provável é que nunca faça falta em usá-los, porém eles foram colocados caso ocorram diferenças na lista de participantes da interface original do Zoom e a interface do Zoom Commander (em casos conhecidos são devidos as limitações que mencionamos do Zoom SDK).

<kbd>Reset</kbd> Atualiza a lista de participantes e deixa a interface como se você tivesse entrado na reunião naquele momento. É a atualização mais agressiva.

<kbd>Sync</kbd> Atualiza a lista de participantes, porém deixa a interface com todas as alterações que você fez.

## A seção *Micro*

Aqui você poderá ver em tempo real quem está com o microfone ativado. Chega de verificar de um por um para conferir se alguém está com microfone ativado e não deveria.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340061-bf702200-dff5-11ea-9a08-6dd3c1ab93e9.png">

### Clique no participante

**O microfone é desativado imediatamente** ou seja, fica sem áudio e, portanto, desaparece da lista.

Não há ações adicionais.

### Botões

<kbd>Ativar proteção</kbd> **Atenção: NÃO ATIVE se você não vai gerenciar ativamente o microfone nas seções *Presidente*, *Designado agora* e *Levantou Mão* durante a reunião, pois com a proteção ativada SÓ os participantes que estão nessas seções poderão receber áudio, ninguém mais.** Este botão ativa uma proteção que desativa automaticamente e imediatamente o microfone de qualquer participante que receba áudio de forma acidental (um anfitrião sem conhecimento, alguém que aceita o áudio posteriormente, etc), para que você não perca tempo com interrupções. Isso funciona graças ao fato de que os participantes que devem ter o seu microfone ativado são aqueles que estão nas seções de *Presidente*, *Designado agora* ou *Levantou Mão*, os demais são ignorados. Enquanto a proteção permanecer ativa, o botão ficará verde. Clique novamente para desativá-la.

<kbd>Mutar todos</kbd> desativa o microfone de todos os participantes e também habilita uma opção importante para que ninguém tenha permissão para ativar o microfone (nem os participantes atuais nem aqueles que ingressem na reunião depois). Faz sentido usar esse botão ao iniciar a reunião, mesmo que para isso haja outro botão na barra lateral que faz essa função e algumas outras coisas.

## A seção *Próximo designado*

Aqui você pode arrastar qualquer participante que tenha uma parte na reunião, de forma que possa deixar preparada o próximo irmão(a) que fará a parte. Também, você deve saber que fazendo um clique direito no mouse você pode adicionar notas naquele participante como você pode ver na imagem.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340630-e4669400-dff9-11ea-87aa-e5a39932fdf9.png">

### Clique no participante

🖱 **Mover para *Designado agora***, ativará o seu microfone, desativando ao mesmo tempo os dos outros.

<kbd>Ctrl</kbd> + 🖱 Ativar/desativar microfone (simples)
<br/><kbd>Shift</kbd> + 🖱 Tirar da seção *Próximo Designado*
<br/><kbd><</kbd> + 🖱 Mover para *Designado agora*, porém sem ativar nem desativar o microfone de ninguém.

### Arrastar participantes

Se você arrastar um participante de volta para a *Seção de Participantes* você o removerá da seção *Próximo Designado*. Você também pode ordenar os participantes na seção de *Próximo Designado* arrastando-os entre si.

## As seções *Designado agora* e *Presidente*

O interessante é que nessa seção, elas são representadas pela cor amarela, e ao fazer um clique sobre um participante você ativa o microfone dele e desativa o microfone automaticamente dos demais. Isso ajuda nas transições como por exemplo, passar a fala para o *Presidente* com um só clique, sem ter que se preocupar em desativar o microfone manualmente de quem fez a designação anterior. Isso ajuda também na alternância da ativação dos microfones entre diferentes participantes da seção *Designado agora*, sem importar a quantidade.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340876-5d1a2000-dffb-11ea-9bbb-09435266a51f.png">

### Clique no participante

🖱 **Ativar o microfone** e desativar o do resto

<kbd>Ctrl</kbd> + 🖱 Ativar/desativar microfone (simples)
<br/><kbd>Shift</kbd> + 🖱 Remover da seção

### Arrastar participantes

Podemos movê-los livremente.

## As seções *Comentando* e *Levantou Mão*

A seção *Levantou Mão* (abaixo) aparecerão todos os participantes que levantarem a mão. A seção superior em verde mostra o participante que foi escolhido para comentar. Fica bem visível e assim você pode removê-lo quando ele terminar de comentar.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90341062-a7e86780-dffc-11ea-9e9a-8b2bb05911ad.png">

### Clique no participante

🖱 **Ativar microfone.** Acontecerão duas coisas: no participante irá ativar o seu microfone e ele será mostrado na zona verde e as mãos levantadas serão abaixadas automaticamente **somente** quando seu microfone for ativado. Isso significa que se o microfone daquela pessoa nunca foi ativado, podemos removê-la da seção clicando nela, porém o resto segue com a mão levantada e poderemos selecionar outro participante.

<kbd>Ctrl</kbd> + 🖱 Ativar/desativar microfone (simples)

### Botões

<kbd>Limpar</kbd> Abaixa todas as mãos.

<kbd>Histórico</kbd> Muda visualmente a seção Levantou Mão com o histórico das mãos que foram levantadas. Isso pode ajudar caso tenhamos abaixado as mãos por erro e necessitamos ativar o microfone de alguém que tenha levantado a mão.

# Como funciona a barra lateral

## Começar a reunião

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341330-031b5980-dfff-11ea-9c1d-893e1ce4e4aa.png">

Ao clicar nesse botão, acontecerão ações que ocorrerão em apenas 1 ou 2 segundos automaticamente:

1. Será ativada a proteção.
2. Será desativado o microfone de todos os participantes.
3. Será configurado uma opção no áudio para que ninguém tenha permissão para ativar seu próprio microfone (nem participantes atuais nem os que entrem depois).
4. O compartilhamento de tela será parado (no caso de estar sendo usado).
5. O microfone do *Presidente* será ativado.

## Comartilhar janela imediatamente

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341328-0282c300-dfff-11ea-9039-bd44e67e4c50.png">

**Atalho de teclado** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>

**Importante: para poder compartilhar vídeos COM AÚDIO, você deverá compartilhar a tela pela interface original do Zoom AO MENOS UMA VEZ POR RENIÃO marcando a caixinha "compartilhar som do computador".** Você pode fazer isso antes que a reunião comece, dessa maneira durante a reunião você poderá usar esse botão (ou atalho de teclado) para compartilhar tanto imagens como vídeos, e o Zoom lembrará que sempre deve compartilhar o som todas as vezes.

Esse botão compartilha de imediato uma janela configurada de forma avançada. Isso é útil pois geralmente sempre é compartilhado o mesmo programa e não tem sentido passar por todas as opções que nos obriga a passar a interface original do Zoom.

Vem pré-configurado para que compartilhe [o programa Media Portal](https://github.com/desko27/mediaportal/blob/master/readme/pt-br.md), porém se você não usa o Media Portal, você pode mudar a janela capturada fazendo um clique direito sobre o botão. A configuração que você aplicar será salva e será mantida em próximas reuniões com o Zoom Commander. Por exemplo, para usar o JW Library você pode introduzir `ApplicationFrameHost.exe/JW Library` na configuração.

## Parar de compartilhar

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341327-01ea2c80-dfff-11ea-8d57-a725b0fbcc4c.png">

**Atalho de teclado** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>0</kbd>

Para de compartilhar a tela. Não faz nada de diferente que o botão original do Zoom, com exceção de ficar disponibilizado um novo atalho de teclado (que é igual com o do Media Portal, para deixar de mostrar a imagem ou o video).

# Limitações conhecidas

No kit de desenvolvimento Electron Zoom SDK faltam uma série de funcionalidades que impõe algumas limitações em Zoom Commander sendo elas:

## Mutar todos os participantes
Se você mutar todos os participantes pelo Zoom Commander não tem problema, porém se outro anfitrião "desativar o som de todos" pela interface original do Zoom não veremos isso no Zoom Commander (muitos aparecerão como se tivessem com o microfone ligado mesmo que não esteja). Se isso acontecer, basta clicar no botão <kbd>Sync</kbd> da seção *Participantes* para que seja atualizado visualmente o estado dos microfones dos participantes. No geral, essa limitação não será um problema porque ninguém além de quem gerencia a reunião pelo Zoom Commander deve usar a opção "desativar o som de todos".

## Abaixar todas as mãos
De maneira similar ao problema anterior, se você abaixa todas as mãos pelo Zoom Commander não tem problema (botão <kbd>Limpar</kbd>), porém se outro anfitrião "abaixar as mãos" não veremos visualmente na seção *Levantou a Mão* do Zoom Commander. No geral, essa limitação tampouco será um problema porque ninguém além de quem está gerenciando a reunião pelo Zoom Commander deve "abaixar todas as mãos".

## Salas simultâneas
Electron Zoom SDK não tem meios para saber quando nos movemos entre as salas simultâneas da reunião. Para ver corretamente a lista de participantes uma vez que entremos numa sala simultânea, teremos que usar o botão <kbd>Reset</kbd>.

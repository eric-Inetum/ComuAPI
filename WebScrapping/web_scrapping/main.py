from types import NoneType
import requests
from bs4 import BeautifulSoup
import os
import re
import json



# # # # # # # # # # # # # # # # # # # # # # # #
#
# función para remover las etiquetas
def remove_tags(html):
 
    # parse html content
    soup = BeautifulSoup(html, "html.parser")
 
    for data in soup(['style', 'script']):
        # Remove tags
        data.decompose()
 
    # return data by retrieving the tag content
    return ' '.join(soup.stripped_strings)
#
# # # # # # # # # # # # # # # # # # # # # # # # # 

# Función que recibe los parametros a enviar en formato JSON y busca por id si el jugador se encuentra en la base de datos hace una petición PATCH
# y actualiza los nuevos datos o si directamente el jugador no existe lo crea haciendo una petición POST.
def peticionAPI(id_jugador, nombre_jugador, propietario, nombre_equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo
                , ranking_posicion, mejorFichaje, media_sofascore, media_puntos, total_puntos, foto, ofertaMin, precio_jugador, precio_min
                , precio_max, tarjetas_amarillas, tarjetas_rojas, tarjetas_doble_amarilla, racha, lesion):
    
    #Url con la que acceder a todos los jugadores
    urlAPI = "http://10.228.64.236:80/api/v3/jugadores"

    # El programa hace una petición a la url declarada anteriormente y recoge el contenido HTML, en el caso de se haya hecho correctamente se almacenará 
    # los identificadores de los jugadores en una lista con el nombre de "api_id". Una vez obtenidos los id, la siguiente variable guarda la estructura 
    # que tendrá el JSON con los datos que recibirá la función. Por último recoge el id de un jugador en concreto y analiza si está en la lista de los 
    # identificadores de los jugadores de la api. En caso de que esté actualiza los datos con el metodo PATCH en la petición y en el caso de que no se 
    # encuentre crea un nuevo registro para ese jugador. 
    
    datosJson = {
        
        "id_jugador": int(id_jugador),
        "nombre": f"{nombre_jugador}",
        "propietario": f"{propietario}",
        "equipo": f"{nombre_equipo}",
        "posicion": f"{posicion}",
        "titular": titular,
        "partidos_jugados": f"{partidos_jugados}",
        "ranking_general": ranking_general,
        "ranking_equipo": ranking_equipo,
        "ranking_posicion": ranking_posicion,
        "mejor_fichaje": mejorFichaje,
        "media_sofascore": media_sofascore,
        "media_puntos": media_puntos,
        "total_puntos": total_puntos,
        "foto": foto,
        "oferta_minima": ofertaMin,
        "valor_mercado": int(precio_jugador),
        "valor_mercado_max": precio_max,
        "valor_mercado_min": precio_min,
        "tarjeta_amarilla": tarjetas_amarillas,
        "tarjeta_roja": tarjetas_rojas,
        "doble_tarjeta_amarilla": tarjetas_doble_amarilla,
        "racha": f"{racha}",
        "lesion": f"{lesion}",
        
    }  

    post_response = requests.post(urlAPI, json=datosJson)

    if post_response.status_code == 200:
        print(f"Post realizado a jugador {nombre_jugador}")
    else:
        print(f"Post no realizado a jugador {nombre_jugador}")



# Declaración de variables para controlar los ficheros de texto
player_id_mejorFichaje = ""
player_id_oferta=[]
oferta=[]
player_id = []
player_id_propietario = []
player_name = []
player_name_propietario = []
propietarios = []
split_linea = ""
linea2 = ""
cont_lineas = 0
cont_lineas_propietario = 0
cont_lineas_oferta = 0
#
#requestAPIKey = requests.post("http://10.228.64.253/api/v1/token")
#if requestAPIKey.status_code == 200:
#    json_data = requestAPIKey.json()
#    apiKey = json_data.get("access_token")
#    print("Api Key obtenida correctamente")
#else:
#    print("No se ha podido recoger la API Key")
#header = {
#    "Authorization": f"Bearer {apiKey}"
#}





# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#
# El programa lee el fichero con el mejor fichaje y saca el id del jugador
fichero_mejor = open('web_scrapping\\input\\mejorFichaje.txt','r')
for linea in fichero_mejor:
    player_id_mejorFichaje = linea
fichero_mejor.close()

# El programa lee el fichero con el nombre e id de todos los jugadores y los guarda en dos listas
fichero_nombres = open('web_scrapping\\input\\urls.txt','r')
for linea in fichero_nombres:
    linea = linea.replace("\n", "")
    split_linea = linea.split("/")
    player_name.append(split_linea[1]) 
    player_id.append(split_linea[0].replace("\n",""))
    cont_lineas+=1
fichero_nombres.close()

# El programa lee el fichero con el nombre, propietario e id de todos los jugadores y los guarda en tres listas 
fichero_propietarios = open('web_scrapping\\input\\propietarios.txt','r')
for linea in fichero_propietarios:
    split_linea = linea.split("/")
    player_id_propietario.append(split_linea[0].replace("\n",""))
    logitud_linea = len(linea)
    linea2 = linea[5:logitud_linea]
    split_linea = linea2.split("'")
    player_name_propietario.append(split_linea[0]) 
    propietarios.append(split_linea[1].replace("\n","")) 
    cont_lineas_propietario += 1
fichero_propietarios.close()

# El programa lee el fichero con la oferta mínima y el id de los jugadores que hay actualmente en el mercado y los guarda en dos listas 
fichero_oferta = open('web_scrapping\\input\\OfertaMinima.txt','r')
for linea in fichero_oferta:
    split_linea = linea.split("/")
    oferta.append(split_linea[1])
    player_id_oferta.append(split_linea[0].replace("\n",""))
    cont_lineas_oferta +=1
fichero_oferta.close()
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 




#El programa de ejecuta tantas veces como jugadores existan en la liga
i = 1
while i <= cont_lineas:

    # Variable que almacena la url del comuniate que irá cambiando en función del nombre e id de cada jugador
    url = "https://www.comuniate.com/jugadores/"+player_id[i-1]+"/"+player_name[i-1]
    url = url.replace("\n", "")

    # Realiza la solicitud HTTP para obtener el contenido HTML
    response = requests.get(url)

    # Verifica si la solicitud fue exitosa (código de estado 200)
    if response.status_code == 200:

        # Analiza el contenido HTML con BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # En este bloque de código se recoge el id del jugador, el nombre de este, su posición, si el jugador es titular y si el jugador es el mejor fichaje
        # del mercado
        id_jugador = player_id[i-1]
        mejorFichaje = False
        if id_jugador in player_id_mejorFichaje:
             mejorFichaje = True
        nombre_jugador = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(1) > div.col-xs-12 > h1 > strong').get_text()
        posicion = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(3) > strong').get_text()
        titular = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(5) > strong').get_text()
        if(titular == "NO"):
            titular = False
        else:
            titular = True 
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

        


        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # En este bloque se analiza si el jugador está fuera de la liga y si está lesionado.
        fuera_liga = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(1) > div.col-xs-12 > div.alert.alert-danger > strong')
        if( type(fuera_liga) != NoneType ):
            fuera_liga = fuera_liga.text
            if( fuera_liga.find("ya no se encuentra")) :
                fuera_liga = 'SI'
            else :
                fuera_liga = 'NO'
        lesionado = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div.col-xs-12 > div')
        lesion = "NO"
        if( type(lesionado) != NoneType ):
            if( not lesionado.text.__contains__("FUERA DE LA LISTA")):
                lesion = lesionado.text
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

              


        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # En este bloque se recogen los datos de la media de todos los puntos que ha hecho el jugador, la media de puntos de SofaScore, el equipo al cuál 
        # pertenece actualmente, el total de puntos realizados, el número de tarjetas (amarillas, doble amarillas y rojas) y por último los partidos jugados
        media_puntos = float(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(2) > div > span:nth-child(1) > strong').get_text())
        media_sofascore= soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(3) > div > span:nth-child(1) > strong')
        if( media_sofascore.get_text() != '' ):
            media_sofascore = float(media_sofascore.get_text())
        else:
            media_sofascore = 0
        equipo = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > img:nth-child(1)')
        nombre_equipo = equipo['title']
        total_puntos = int(soup.select_one("body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(1) > div > span:nth-child(1) > strong").get_text())
        tarjetas_amarillas = int(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(5)').get_text())
        tarjetas_rojas = int(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(9)').get_text())
        tarjetas_doble_amarilla = int(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(7)').get_text())
        partidos_jugados = soup.select_one("body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(4) > div > span:nth-child(1) > strong").get_text()
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 




        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # Este bloque guarda la racha que lleva el jugador, el precio máximo que ha alcanzado y el mínimo alcanzado.
        racha = ""
        precio_max = int(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(4) > div.col-md-8 > div:nth-child(4) > div:nth-child(2) > span').get_text().replace("€","").replace(".",""))
        precio_min = int(soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(4) > div.col-md-8 > div:nth-child(4) > div:nth-child(3) > span').get_text().replace("€","").replace(".",""))
        racha_flecha = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > span > i')
        racha_class = racha_flecha.get('class')
        if "fa-arrow-up" in racha_class:
           racha = "Buena"
        elif "fa-arrow-right" in racha_class:
            racha = "Normal"
        elif "fa-arrow-down" in racha_class:
            racha = "Mala"

        foto = soup.select_one('body > section > div.container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > img:nth-child(2)').get('src')
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

        
       

        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # En este bloque se utilizan las listeas creadas al principio respecto a los archivos "OfertaMinima.txt" y "propietarios.txt" para saber la oferta 
        # mínima y el propietario del jugador.
        ofertaMin = None
        if id_jugador in player_id_oferta:
             linea2 = 0
             
             for h in player_id_oferta:
                if id_jugador in h :
                    index_oferta = player_id_oferta.index(id_jugador)
                    ofertaMin = int(oferta[index_oferta])
                    break
                else:
                 linea2 +=1
                

        propietario = "Computer"
        if id_jugador in player_id_propietario:
            linea = 0
            for posicionID in player_id_propietario:
                if id_jugador in posicionID:
                    break
                else:
                    linea += 1

            propietario = propietarios[linea]
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


        # Ahora los siguientes datos se sacarán del apartado de mercado de cada jugador
        url = "https://www.comuniate.com/mercado/"+player_id[i-1]+"/"+player_name[i-1]

        # Realiza la solicitud HTTP para obtener el contenido HTML
        response = requests.get(url)

        # Analiza el contenido HTML con BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
        #
        # En este bloque se guarda la información respecto al podio del jugador en el ranking general, del equipo y de su posición y por último se recoge 
        # el valor del jugador
        informacion = soup.find_all('span', { 'class' : 'label label-info'})

        general = str(informacion[0])
        soupR = BeautifulSoup(general, 'html.parser')
        contenido_general = soupR.get_text().split(" ")
        ranking_general = int(contenido_general[0])

        equipo = str(informacion[1])
        soupR = BeautifulSoup(equipo, 'html.parser')
        contenido_equipo = soupR.get_text().split(" ")
        ranking_equipo = int(contenido_equipo[0])

        posicionr = str(informacion[2])
        soupR = BeautifulSoup(posicionr, 'html.parser')
        contenido_posicion = soupR.get_text().split(" ")
        ranking_posicion = int(contenido_posicion[0])

        precio_jugador = soup.find('td',).findChild().get_text()
        precio_jugador = precio_jugador.replace("€","").replace(".","")
        #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
    

        # Una vez recogidos todos los datos para almacenar en formato json se llama a la función
        peticionAPI(id_jugador, nombre_jugador, propietario, nombre_equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo
        , ranking_posicion, mejorFichaje, media_sofascore, media_puntos, total_puntos, foto, ofertaMin, precio_jugador, precio_min, precio_max
        , tarjetas_amarillas, tarjetas_rojas, tarjetas_doble_amarilla, racha, lesion)


    
    # En el caso que no se haya podido acceder al Comuniate mostraría un codigo de error por consola
    else:
        print("La solicitud no fue exitosa. Código de estado:", response.status_code)

    # Variable que hace que vaya al siguiente jugador de la lista
    i+=1


    
# Una vez que se hayan hecho los cambios en todos los jugadores, se borran los siguientes ficheros para que no se repita la información
os.remove("web_scrapping/input/mejorFichaje.txt")
os.remove("web_scrapping/input/OfertaMinima.txt")
os.remove("web_scrapping/input/propietarios.txt")
os.remove("web_scrapping/input/urls.txt")

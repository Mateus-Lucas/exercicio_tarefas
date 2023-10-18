import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'

export default function Tarefas() {

  const [tarefas, setTarefas] = useState(['Estudar'])
  const [inputValue, setInputValue] = useState('')
  const [editando, setEditando] = useState(false)
  const [tarefaSendoEditada, setTarefasendoEditada] = useState(null)

  function adicionarTarefa() {
    let novaListatarefas = tarefas
    novaListatarefas.push(inputValue)
    setTarefas(novaListatarefas)
    setTarefasendoEditada(null)
    setInputValue('')
  }

  function editarTarefa() {
    let index = tarefas.indexOf(tarefaSendoEditada)
    let novaListatarefas = tarefas
    novaListatarefas.splice(index, 1, inputValue)
    setTarefas(novaListatarefas)
    setEditando(false)
    setInputValue('')
  }

  function excluirTarefa(tarefa) {
    let novaListatarefas = tarefas.filter(item => item !== tarefa)
    setTarefas(novaListatarefas)
  }

  function handleEditartarefa(tarefa) {
    setTarefasendoEditada(tarefa)
    setInputValue(tarefa)
    setEditando(true)
  }

  function handleButton() {
    if (editando) {
      editarTarefa()
    } else {
      adicionarTarefa()
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>

        <TextInput
          style={{ flex: 4 }}
          mode='outlined'
          label='Tarefa'
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />


        <Button
          style={styles.button}
          mode='contained'
          onPress={handleButton}
        >
          {editando ? 'Editar' : 'Adicionar'}
        </Button>

      </View>



      <FlatList
        style={styles.list}
        data={tarefas}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            mode='outlined'
          >
            <Card.Content style={styles.cardContent}>
              <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
              <IconButton icon='pen' onPress={() => {
                handleEditartarefa(item)
              }} />
              <IconButton icon='trash-can-outline' onPress={() => {
                excluirTarefa(item)
              }} />
            </Card.Content>
          </Card>
        )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 10,
    gap: 5
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    width: '95%',
    marginTop: 10
  },
  card: {
    margin: 5
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
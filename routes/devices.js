const express = require('express');
const app = express();
const Device = require('../models/device');


app.get(`/`, async (req, res) => {
    try {
        const devices = await Device.find({});
        res.status(200).json({
            message: 'ok',
            devices
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Database error'
        });
    }
});

app.post('/', async (req, res, next) => {
    try {
        const device = new Device({
            _id: req.body._id,
            name: req.body.name,
            brand: req.body.brand
        });

        const deviceSaved = await device.save();
        res.status(200).json({
            message: 'Ok',
            device: deviceSaved
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
});

app.put(`/:id`, async (req, res) => {
    try {
        const deviceId = req.params.id;

        const updatedDevice = await Device.findOneAndUpdate(
            { _id: deviceId }, 
            req.body,          
            { new: true }      
        );

        if (!updatedDevice) {
            return res.status(404).json({ message: 'Dispositivo no encontrado' });
        }

        res.status(200).json({ message: 'Dispositivo actualizado correctamente', device: updatedDevice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar el dispositivo' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deviceId = req.params.id; 

        const infoDeleted = await Device.deleteOne({ _id: deviceId });

        if (infoDeleted.deletedCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún dispositivo para eliminar'
            });
        }

        res.status(200).json({
            message: 'Dispositivo eliminado correctamente',
            info: infoDeleted
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
});

module.exports = app;